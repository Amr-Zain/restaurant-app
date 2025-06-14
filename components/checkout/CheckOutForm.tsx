"use client";
import { CreditCard, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import DateFields from "../util/formFields/DateField";
import { TimePickerField } from "../reservation/TimePickr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
const info = [
  { id: 1, label: "Delivery", value: "delivery", icon: Package },
  {
    id: 2,
    label: "Takeaway",
    value: "take_away",
    icon: CreditCard,
  },
];

const payment = [
  { id: 1, label: "Card", value: "1", icon: CreditCard },
  {
    id: 2,
    label: "Cash",
    value: "0",
    icon: Package,
  },
];

const formSchema = z
  .object({
    order_type: z.enum(["delivery", "take_away"], {
      required_error: "You need to select an order type.",
    }),
    is_schedule: z.enum(["1", "0"], {
      required_error: "You need to select an order schedule option.",
    }),
    date: z.string().optional(),
    order_time: z.string().optional(),
    pay_type: z.enum(["1", "0"], {
      required_error: "You need to select a payment method.",
    }),
    address_id: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.is_schedule === "1") {
      if (!data.date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date is required for scheduled orders.",
          path: ["date"],
        });
      }
      if (!data.order_time) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Time is required for scheduled orders.",
          path: ["order_time"],
        });
      }
    }

    if (data.order_type === "delivery") {
      if (!data.address_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping address is required for delivery orders.",
          path: ["address_id"],
        });
      }
    }
  });
function CheckOutForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order_type: "delivery",
      is_schedule: "0",
      date: "",
      order_time: "",
      pay_type: "0",
      address_id: undefined,
    },
  });

  const { fetchAdderss, data } = useAddressStore((state) => state);
  const [address, setAddress] = useState(
    data.find((item) => item.is_default === true) || data[0],
  );
  const store_id = useBranchStore((state) => state.currentBranch?.id)||1;

  useEffect(() => {
    form.setValue("address_id", address?.id);
  }, [address, form]);

  const [openAddress, setOpenAddress] = useState(false);
  const onSubmit = async (data) => {
    if (!store_id) throw "bransh id is required";
    await postOrder({ ...data, address_id: address?.id, store_id,has_wallet:0 });
  };
  const { handleSubmit } = useFormSubmission(form, {
    submitFunction: onSubmit,
  });
  console.log(form.formState.errors);

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
            <h4 className="text-text mb-3 text-sm font-bold">Order Type</h4>
            <FormField
              control={form.control}
              name="order_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {info.map((item) => (
                        <FormItem key={item.id} className="checkout-input">
                          <FormControl>
                            <RadioGroupItem
                              value={item.value}
                              id={item.value}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={item.value}
                            className="flex h-full w-full cursor-pointer items-center gap-2"
                          >
                            <item.icon className="text-sub size-5" />
                            <span className="text-text text-sm">
                              {item.label}
                            </span>
                            {field.value === item.value && (
                              <span className="text-primary ml-auto">✓</span>
                            )}
                          </FormLabel>
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
                Your Shipping Address
              </h4>
              <FormField
                control={form.control}
                name="address_id" 
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <OrderItem
                        className="border-0 bg-white shadow-none"
                        id={address.id} 
                        image={map}
                        title={address?.title || "Select An Address"}
                        desc={address?.desc as string}
                        onUpdate={() => setOpenAddress(true)}
                      />
                    </FormControl>
                    <FormMessage /> {/* Display validation error */}
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
                          className="text-text cursor-pointer"
                        >
                          Schedule Order
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={"0"} id={"order-now"} />
                        </FormControl>
                        <FormLabel
                          htmlFor={"order-now"}
                          className="text-text cursor-pointer"
                        >
                          Order Now
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
                  name="date"
                  placeholder="Select date"
                  className="checkout-input border-0 shadow-none"
                  disabled={isLoading}
                />

                <TimePickerField
                  name="order_time"
                  control={form.control}
                  placeholder="Select time"
                  className="checkout-input !px-4 !py-4"
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-text mb-3 text-sm font-bold">
              Payment Methods
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
                      {payment.map((item) => (
                        <FormItem key={item.id} className="checkout-input">
                          <FormControl>
                            <RadioGroupItem
                              value={item.value}
                              id={`payment-${item.value}`}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`payment-${item.value}`}
                            className="flex h-full w-full cursor-pointer items-center gap-2"
                          >
                            <item.icon className="text-sub size-5" />
                            <span className="text-text text-sm">
                              {item.label}
                            </span>
                            {field.value === item.value && (
                              <span className="text-primary ml-auto">✓</span>
                            )}
                          </FormLabel>
                        </FormItem>
                      ))}
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
            className="w-30 font-semibold"
          >
            {isLoading ? "Submitting..." : "Submit"}
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
      />
    </>
  );
}

export default CheckOutForm;
