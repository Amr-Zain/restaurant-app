"use client";
import { CreditCard, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import DateFields from "../util/formFields/DateField";
import { TimePickerField } from "../reservation/TimePickr";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import OrderItem from "../orders/orderDetails/Item";
import { useEffect, useState } from "react";
import { useAddressStore } from "@/stores/address";
import map from "@/assets/images/map.png";
import AddressModal from "../address/AddressModal";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { postOrder } from "@/services/ClientApiHandler";
import { useBranchStore } from "@/stores/branchs";
import { CheckoutFromType, checkoutSchema } from "@/helper/schema";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cart";
import { format } from "date-fns";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import axios from "axios";
import { appStore } from "@/stores/app";

function CheckOutForm() {
  const t = useTranslations();

  const info = [
    { id: 1, label: t("checkout.delivery"), value: "delivery", icon: Package },
    {
      id: 2,
      label: t("checkout.takeaway"),
      value: "take_away",
      icon: CreditCard,
    },
  ];
  const user = useAuthStore((state) => state.user!);
  const payment = [
    { id: 1, label: t("checkout.card"), value: "1", icon: CreditCard },
    {
      id: 2,
      label: t("checkout.cash"),
      value: "0",
      icon: Package,
    },
    {
      id: 3,
      label: "Points",
      value: "2",
      icon: CreditCard,
    },
  ];
  const formSchema = checkoutSchema();
  const form = useForm<CheckoutFromType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order_type: "delivery",
      is_schedule: "0",
      order_time: "",
      pay_type: "0",
      address_id: undefined,
    },
  });

  const router = useRouter();
  const { fetchAdderss, data } = useAddressStore((state) => state);
  const [address, setAddress] = useState(
    data.find((item) => item.is_default === true) || data[0],
  );
  const store_id = useBranchStore((state) => state.currentBranch?.id || 1);
  const { points:{isPointsCovers, usePoints}, setPointsStatues } = appStore((state) => state);
  const total_price = useCartStore((state) => state.price?.total)!;
  const fetchCart = useCartStore((state) => state.fetchCartItems);
  const [openAddress, setOpenAddress] = useState(false);
  useEffect(() => {
    form.setValue("address_id", address?.id);
    setPointsStatues({
      isPointsCovers: total_price <= user.points,
      points: user.points,
    });
  }, [address, form, setPointsStatues, total_price, user.points]);

  const onSubmit = async (data: CheckoutFromType) => {
    if (!store_id) throw new Error("Branch ID is required");
    const pay_type = [];
    if (data.pay_type === "1") {
      if (usePoints)
        pay_type.push(
          { wallet: total_price - user.points },
          { points: user.points },
        );
      else pay_type.push({ credit: total_price });

      const { data: url } = await axios.post("create-order", {
        address_id: address?.id,
        pay_type,
        is_schedule: data.is_schedule,
        order_type: data.order_type,
      });
      console.log(url);
      return;
    } else if (data.pay_type === "0") {
      if (usePoints)
        pay_type.push(
          { cash: total_price - user.points },
          { points: user.points },
        );
      else pay_type.push({ cash: total_price });
    } else {
      pay_type.push({ points: total_price });
    }
    return await postOrder({
      ...data,
      address_id: address?.id,
      pay_type: JSON.stringify(pay_type),
      order_date: data?.order_date ? format(data.order_date, "yyyy-MM-dd") : "",
      store_id,
    });
  };

  const { handleSubmit } = useFormSubmission(form, {
    submitFunction: onSubmit,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    onSuccess: (data: { data: Order }) => {
      router.push(`orders/${data.data.id}`);
    },
  });

  const scheduleOption = form.watch("is_schedule");
  const orderType = form.watch("order_type");
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    fetchAdderss();
  }, [fetchAdderss]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div>
            <h4 className="text-text mb-3 text-sm font-bold">
              {t("checkout.orderType")}
            </h4>
            <FormField
              control={form.control}
              name="order_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        fetchCart({
                          order_type: value,
                          address_id: address?.id?.toString(),
                        });
                        router.refresh();
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {info.map((item) => (
                        <FormItem key={item?.id} className="checkout-input">
                          <FormLabel
                            htmlFor={item.value}
                            className="flex h-full w-full cursor-pointer items-center gap-2"
                          >
                            <item.icon className="text-sub size-5" />
                            <span className="text-text text-sm font-bold">
                              {item.label}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem
                              value={item.value}
                              id={item.value}
                            />
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {orderType === "delivery" && (
            <div>
              <h4 className="text-text mb-3 text-sm font-bold">
                {t("checkout.yourShippingAddress")}
              </h4>
              <FormField
                control={form.control}
                name="address_id"
                render={() => (
                  // Removed field destructuring as it's not directly used here
                  <FormItem>
                    <FormControl>
                      <OrderItem
                        className="border-0 bg-white shadow-none"
                        id={address?.id}
                        image={map}
                        title={address?.title || t("checkout.selectAnAddress")}
                        desc={address?.desc as string}
                        onUpdate={() => setOpenAddress(true)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="is_schedule"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-4 sm:flex-row"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={"1"} id={"schedule-order"} />
                        </FormControl>
                        <FormLabel
                          htmlFor={"schedule-order"}
                          className="text-text cursor-pointer font-bold"
                        >
                          {t("checkout.scheduleOrder")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={"0"} id={"order-now"} />
                        </FormControl>
                        <FormLabel
                          htmlFor={"order-now"}
                          className="text-text cursor-pointer font-bold"
                        >
                          {t("checkout.orderNow")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {scheduleOption === "1" && (
              <div className="grid grid-cols-2 items-center gap-4">
                <DateFields
                  control={form.control}
                  label=""
                  name="order_date"
                  placeholder={t("checkout.selectDate")}
                  className="checkout-input border-0 shadow-none"
                  disabled={isLoading}
                />

                <TimePickerField
                  name="order_time"
                  control={form.control}
                  placeholder={t("checkout.selectTime")}
                  className="checkout-input !px-4 !py-4"
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-text mb-3 text-sm font-bold">
              {t("checkout.paymentMethods")}
            </h4>
            <FormField
              control={form.control}
              name="pay_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {payment.map((item, i) => {
                        return (
                          (i !== 2 || isPointsCovers) && (
                            <FormItem
                              key={item.id}
                              className="checkout-input justify-between"
                            >
                              <FormLabel
                                htmlFor={`payment-${item.value}`}
                                className="flex h-full w-full cursor-pointer items-center gap-2"
                              >
                                <item.icon className="text-sub size-5" />
                                <span className="text-text text-sm font-bold">
                                  {item.label}
                                </span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem
                                  value={item.value}
                                  id={`payment-${item.value}`}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="!h-11 min-w-45 font-semibold"
          >
            {isLoading ? t("buttons.loading") : t("buttons.submit")}
          </Button>
        </form>
      </Form>
      <AddressModal
        open={openAddress}
        onOpenChange={setOpenAddress}
        onAddressClick={(value) => {
          setAddress(value);
          setOpenAddress(false);
        }}
        /* className="mx-[2.5%] !mt-[5vh] h-[90vh] w-full rounded-2xl sm:mx-[calc((100vw-400px)/2)]" */
      />
    </>
  );
}

export default CheckOutForm;
