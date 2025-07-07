"use client";
import { CreditCard, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import DateFields from "../util/formFields/DateField";
import { TimePickerField } from "../reservation/TimePickr";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { postOrder } from "@/services/ClientApiHandler";
import SelectAddress from "../address/SelectAddress";
import SuccessPopup from "../util/SuccessPopup";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart";

const OrderTypeOptions = [
  { id: 1, label: "checkout.delivery", value: "delivery", icon: Package },
  {
    id: 2,
    label: "checkout.takeaway",
    value: "take_away",
    icon: CreditCard,
  },
];

const PaymentOptions = [
  { id: 1, label: "checkout.card", value: "1", icon: CreditCard },
  { id: 2, label: "checkout.cash", value: "0", icon: Package },
  { id: 3, label: "checkout.points", value: "2", icon: CreditCard },
];

function CheckOutForm({ params }: { params: Record<string, string> }) {
  const t = useTranslations();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const {
    form,
    address,
    openAddress,
    isPointsCovers,
    isLoading,
    handleSubmit,
    setOpenAddress,
    handleAddressClick,
    handleOrderTypeChange,
    orderType,
    scheduleOption,
  } = useCheckoutForm({ setOpenSuccess, setOrderId });
  const clearCart = useCartStore(state=>state.clearCart)
  useEffect(() => {
    (async () => {
      if (params.status === "success") {
        try {
          const res = await postOrder(params);
          setOrderId(res.data.id);
          setOpenSuccess(true);
          clearCart(true);
          //router.replace(`orders/${res.data.id}`);
        } catch (err: unknown) {
          console.error(err);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          toast.error(err?.response?.data || "unexpexted error");
        }
      }
    })();
  }, [clearCart, params]);
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
                      onValueChange={handleOrderTypeChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {OrderTypeOptions.map((item) => (
                        <FormItem key={item.id} className="checkout-input">
                          <FormLabel
                            htmlFor={item.value}
                            className="flex h-full w-full cursor-pointer items-center gap-2"
                          >
                            <item.icon className="text-sub size-5" />
                            <span className="text-text text-sm font-bold">
                              {t(item.label)}
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
              <SelectAddress
                address={address}
                onAddressClick={handleAddressClick}
                open={openAddress}
                onOpenChange={setOpenAddress}
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
                      {PaymentOptions.map(
                        (item, i) =>
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
                                  {t(item.label)}
                                </span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem
                                  value={item.value}
                                  id={`payment-${item.value}`}
                                />
                              </FormControl>
                            </FormItem>
                          ),
                      )}
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
      <SuccessPopup
        cancelLabel="Continue Shopping"
        cancelUrl={"/"}
        open={openSuccess}
        setOpen={setOpenSuccess}
        successLabel={"Order Details"}
        successUrl={`orders/${orderId}`}
      />
    </>
  );
}

export default CheckOutForm;
