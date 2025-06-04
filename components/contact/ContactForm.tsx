"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumber from "../util/formFields/PhoneInput";
import usePhoneCode from "@/hooks/usePhoneCode";

import { useFormSubmission } from "@/hooks/useFormSubmission";
import { contactFormSchema, ContactFormType } from "@/helper/schema";
import { useAuthStore } from "@/stores/auth";
import Field from "../util/formFields/FormField";
import SelectField from "../util/formFields/SelectField";
import { postContactForm } from "@/services/ClientApiHandler";

const ContactUsForm = () => {
  const t = useTranslations();
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const authedUser = useAuthStore((state) => state.user);
  const formSchema = useMemo(
    () => contactFormSchema({ t, currentPhoneLimit }),
    [currentPhoneLimit, t],
  );

  const form = useForm<ContactFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_code: authedUser?.phone_code || "",
      full_name: authedUser?.full_name || "",
      phone: authedUser?.phone || "",
      message_type: "complaint",
      message: "",
    },
  });

  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const isLoading = form.formState.isSubmitting;

  const { handleSubmit: handleContactSubmit } =
    useFormSubmission<ContactFormType>(form, {
      submitFunction: postContactForm,
    });

 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleContactSubmit)} className="space-y-4">
        <h2 className="text-text text-3xl font-bold">Contact Us</h2>
        <div className="space-y-4">
          <Field
            control={form.control}
            name="full_name"
            placeholder={t("labels.fullName")}
            label=""
            disabled={isLoading}
          />
          <PhoneNumber
            control={form.control}
            phoneCodeName="phone_code"
            phoneNumberName="phone"
            countries={countries}
            currentPhoneLimit={currentPhoneLimit}
          />
          <SelectField
            control={form.control}
            name="message_type"
            placeholder={t("labels.chooseTypeOfMessage")}
            items={[{ label: "Complaint", value: "complaint" }]}
            triggerClassName="w-full !text-text"
          />

          <Field
            control={form.control}
            name="message"
            textarea
            placeholder={t("labels.enterYourMessageHere")}
            rows={10}
          />
        </div>

        {form.formState.errors.root && (
          <p className="text-center text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("buttons.loading") : t("buttons.sendMessage")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
