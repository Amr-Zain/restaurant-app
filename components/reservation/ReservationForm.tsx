"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import Field from "../util/formFields/FormField";
import { TimePickerField } from "./TimePickr";
import DateFields from "../util/formFields/DateField";
import SelectField from "../util/formFields/SelectField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { postReservation } from "@/services/ClientApiHandler";
import PhoneNumber from "../util/formFields/PhoneInput";
import usePhoneCode from "@/hooks/usePhoneCode";
import { ReservationFromType, reservationSchema } from "@/helper/schema";
import { useBranchStore } from "@/stores/branchs";

export default function ReservationForm({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations();
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );

  const guests = [
    { value: "1", label: "1 " + t("labels.person") },
    { value: "2", label: "2 " + t("labels.people") },
    { value: "3", label: "3 " + t("labels.people") },
    { value: "4", label: "4 " + t("labels.people") },
    { value: "5", label: "5 " + t("labels.people") },
    { value: "6", label: "6 " + t("labels.people") },
    { value: "7", label: "7 " + t("labels.people") },
  ];
  const branches = useBranchStore((state) => state.branchs);
  const form = useForm<ReservationFromType>({
    resolver: zodResolver(reservationSchema({ t, currentPhoneLimit })),
    defaultValues: {
      name: "",
      phone_code: "20",
      phone: "",
      guests_number: "1",
      store_id: "",
      from_time: "06:00 PM",
      to_time: "07:00 PM",
    },
  });

  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const isLoading = form.formState.isSubmitting;

  const { handleSubmit: handleReservationSubmit } =
    useFormSubmission<ReservationFromType>(form, {
      submitFunction: (data: ReservationFromType) =>
        postReservation({ form: data, id: data.store_id }),
    });

  const onSubmit = async (data: ReservationFromType) => {
    await handleReservationSubmit(data);
    if (onClick) onClick();
  };

  return (
    <div
      className={`h-full w-full rounded-3xl bg-[url('@/assets/images/table.png')] p-4 md:p-8 ${className}`}
    >
      <div className="mx-auto max-w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-full space-y-4 p-4"
          >
            <div className="text-text mb-8 text-center">
              <div className="mb-2 font-serif text-lg italic">
                {t("labels.reservations")}
              </div>
              <h1 className="mb-2 text-3xl font-bold">
                {t("labels.bookTable")}
              </h1>
            </div>
            <Field
              control={form.control}
              name="name"
              placeholder={t("labels.namePlaceholder")}
              label=""
              className="reserv-input !placeholder-text"
              disabled={isLoading}
            />

            <PhoneNumber
              control={form.control}
              phoneCodeName="phone_code"
              phoneNumberName="phone"
              codeClass="reserv-input"
              phoneClass="reserv-input !h-12 ms-4"
              countries={countries}
              currentPhoneLimit={currentPhoneLimit}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                control={form.control}
                name="guests_number"
                items={guests}
                placeholder={t("labels.guests")}
                triggerClassName="reserv-input w-full"
              />
              <SelectField
                control={form.control}
                name="store_id"
                placeholder={t("labels.branch")}
                items={branches.map((b) => ({
                  label: b.name,
                  value: String(b.id),
                }))}
                triggerClassName="reserv-input w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TimePickerField control={form.control} name="from_time" />
              <TimePickerField control={form.control} name="to_time" />
            </div>
            <DateFields
              control={form.control}
              label=""
              name={"date"}
              placeholder={t("labels.date")}
              className={
                "reserv-input !placeholder-text cursor-pointer hover:bg-transparent"
              }
              disabled={isLoading}
            />
            {form.formState.errors.root && (
              <p className="text-center text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="flex justify-between">
              <div></div>{" "}
              <Button
                type="submit"
                className="text-md !h-11 px-6 font-semibold cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? t("buttons.loading") : t("labels.bookTable")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
