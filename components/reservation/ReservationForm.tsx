"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useTranslations } from "next-intl";
import Field from "../util/formFields/FormField";
import { TimePickerField } from "./TimePickr";
import DateFields from "../util/formFields/DateField";
import SelectField from "../util/formFields/SelectField";
export default function ReservationForm() {
  const t = useTranslations("reservation");
  const guests = [
    { value: "1", label: "1 " + t("form.person") },
    { value: "2", label: "2 " + t("form.people") },
    { value: "3", label: "3 " + t("form.people") },
    { value: "4", label: "4 " + t("form.people") },
    { value: "5", label: "5 " + t("form.people") },
    { value: "6", label: "6 " + t("form.people") },
    { value: "7", label: "7 " + t("form.people") },
  ];
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("validation.nameMin"),
    }),
    branch: z.string().min(1, {
      message: t("validation.nameMin"),
    }),
    phone: z.string().min(10, {
      message: t("validation.phoneMin"),
    }),
    guests: z.string({
      required_error: t("validation.guestsRequired"),
    }),
    date: z.date({
      required_error: t("validation.dateRequired"),
    }),
    from: z.string({
      required_error: t("validation.fromTimeRequired"),
    }),
    to: z.string({
      required_error: t("validation.toTimeRequired"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      guests: "1",
      from: "06:00:00 PM",
      branch: "",
      to: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full rounded-3xl bg-gradient-to-br bg-[url('@/assets/images/table.png')] p-4 md:p-8">
      <div className="relative z-10 mx-auto max-w-full">
        {/* Header */}
        <div className="text-text mb-8 text-center">
          <div className="mb-2 font-serif text-lg italic">
            {t("title.reservations")}
          </div>
          <h1 className="mb-2 text-3xl font-bold">{t("title.bookTable")}</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-128 space-y-4 p-4 mx-auto max-w-full"
          >
            <Field
              control={form.control}
              name="name"
              placeholder={t("form.namePlaceholder")}
              label=""
              className="reserv-input"
            />

            <Field
              control={form.control}
              name="phone"
              placeholder={t("form.phonePlaceholder")}
              label=""
              className="reserv-input"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                control={form.control}
                name="guests"
                items={guests}
                triggerClassName="reserv-input w-full"
              />
              <SelectField
                control={form.control}
                name="branch"
                placeholder="Branch"
                items={[
                  { label: "Branch 1", value: "branch1" },
                  { label: "Branch 2", value: "branch2" },
                  { label: "Branch 3", value: "branch3" },
                ]}
                triggerClassName="reserv-input w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TimePickerField control={form.control} name="from" />
              <TimePickerField control={form.control} name="to" />
            </div>
            <DateFields
              control={form.control}
              label=""
              name={"date"}
              className={"reserv-input"}
            />
            <div className="flex justify-between">
              <div></div>
              <Button
                type="submit"
                className="text-md !h-10 font-semibold text-white transition-all duration-200"
              >
                {t("form.bookTable")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
