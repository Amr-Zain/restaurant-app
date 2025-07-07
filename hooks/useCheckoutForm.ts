
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddressStore } from "@/stores/address";
import { useBranchStore } from "@/stores/branchs";
import { appStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { payment, postOrder } from "@/services/ClientApiHandler";
import { CheckoutFromType, checkoutSchema } from "@/helper/schema";
import { format } from "date-fns";
import { useFormSubmission } from "@/hooks/useFormSubmission";

export const useCheckoutForm = ({ setOpenSuccess, setOrderId }: { setOpenSuccess: (v: boolean) => void; setOrderId: (v: number | null) => void; }) => {
  const { data: addresses, fetchAdderss } = useAddressStore();
  const currentBranch = useBranchStore((state) => state.currentBranch);
  const {
    isPointsCovers, usePoints
  } = appStore(state => state.points);
  const { price, fetchCartItems, clearCart, items } = useCartStore();

  const { user, updateUserPoints } = useAuthStore((state) => state);

  const [address, setAddress] = useState(
    addresses.find((item) => item.is_default === true) || addresses[0]
  );
  const [openAddress, setOpenAddress] = useState(false);

  const form = useForm<CheckoutFromType>({
    resolver: zodResolver(checkoutSchema()),
    defaultValues: {
      order_type: "delivery",
      is_schedule: "0",
      order_time: "",
      pay_type: "0",
      address_id: address?.id,
    },

  });
  useEffect(() => {
    fetchAdderss();
  }, [fetchAdderss]);

  useEffect(() => {
    form.setValue("address_id", address?.id);
  }, [address, form]);
  const cridetPaymet = async (data: CheckoutFromType) => {
    const pay_type = [];
    const total_price = price!.total!;

    if (usePoints) {
      pay_type.push(
        { wallet: total_price - user!.points },
        { points: user!.points }
      );
    } else {
      pay_type.push({ credit: total_price });
    }
    const checkoutPayload = {
      ...data,
      cartProducts: items,
      total: pay_type.length == 2 ? total_price - (user?.points || 0) : total_price,
      address_id: address?.id,
      pay_type: JSON.stringify(pay_type),
      order_date: data?.order_date
        ? format(data.order_date, "yyyy-MM-dd")
        : "",
      store_id: currentBranch?.id || 1,
    }

    const session = await payment(checkoutPayload);

    if (session.url) {
      window.location.href = session.url;
    }
  }
  const onSubmit = async (data: CheckoutFromType) => {
    //if (!currentBranch?.id) throw new Error(t("requiredField", { field: t("labels.branch") }));

    const pay_type = [];
    const total_price = price!.total!;

    if (data.pay_type === "1") {
      await cridetPaymet(data);
      return;
    } else {
      if (data.pay_type === "0") {
        if (usePoints) {
          pay_type.push(
            { cash: total_price - user!.points },
            { points: user!.points }
          );
        } else {
          pay_type.push({ cash: total_price });
        }
      } else {
        pay_type.push({ points: total_price });
      }
      const res = await postOrder({
        ...data,
        address_id: address?.id,
        pay_type: JSON.stringify(pay_type),
        order_date: data?.order_date
          ? format(data.order_date, "yyyy-MM-dd")
          : "",
        store_id: currentBranch?.id || 1,
      });
      return res
    }
  };


  const { handleSubmit } = useFormSubmission(form, {
    submitFunction: onSubmit,
    onSuccess: (data: SubmissionResult) => {
      if (form.watch('pay_type') === '2') updateUserPoints(user!.points - price!.total)
      else if (usePoints) updateUserPoints(0)
      if(!data) return;
      clearCart(true);
      //router.replace(`orders/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setOrderId(data?.data?.id)
      setOpenSuccess(true);
    },
  });

  const handleOrderTypeChange = (value: string) => {
    fetchCartItems({
      order_type: value,
      address_id: address?.id?.toString(),
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    form.setValue("order_type", value);
  };

  return {
    form,
    address,
    openAddress,
    isPointsCovers,
    isLoading: form.formState.isSubmitting,
    handleSubmit,
    setOpenAddress,
    handleAddressClick: setAddress,
    handleOrderTypeChange,
    orderType: form.watch("order_type"),
    scheduleOption: form.watch("is_schedule"),
  };
};
