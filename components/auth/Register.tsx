"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumber from "../util/formFields/PhoneInput";
import Field from "../util/formFields/FormField";
import PasswordField from "../util/formFields/PasswordField";
import { register } from "@/services/ClientApiHandler";
import { createRegisterFormSchema, RegisterFormType } from "@/helper/schema";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import usePhoneCode from "@/hooks/usePhoneCode";
import { appStore } from "@/stores/app";

const RegisterForm = () => {
  const t = useTranslations();
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(createRegisterFormSchema({ t, currentPhoneLimit })),
    defaultValues: {
      phone_code: "20",
    },
  });
  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const setVerify = appStore((state) => state.setVerify);
  const isPending = form.formState.isLoading;
  const { handleSubmit: registerUser } = useFormSubmission<RegisterFormType>(
    form,
    {
      submitFunction: register,
      onSuccessPath: "/auth/verification",
    },
  );
  const handleSubmit = async (data: RegisterFormType) => {
    const res = await registerUser(data);
    if (res.status === "success") {
      setVerify({
        type: "register",
        code: data.phone_code,
        phone: data.phone,
        resetCode: null,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Field
          control={form.control}
          name="full_name"
          placeholder={t("labels.fullName")}
          label=""
          disabled={isPending}
        />
        <Field
          control={form.control}
          name="email"
          type="email"
          placeholder={t("labels.email")}
          label=""
          disabled={isPending}
        />
        <PhoneNumber
          control={form.control}
          phoneCodeName="phone_code"
          phoneNumberName="phone"
          countries={countries}
          isLoading={isPending}
          currentPhoneLimit={currentPhoneLimit}
        />

        <PasswordField
          control={form.control}
          name="password"
          placeholder={t("labels.password")}
          isLoading={isPending}
        />
        {/*  <PasswordField
          control={form.control}
          name="password_confirmation"
          placeholder={t("labels.passwordConfirmation")}
          isLoading={isPending}
        /> */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t("buttons.loading") : t("buttons.register")}
        </Button>

        <div className="mt-0 text-center text-sm">
          {form.formState.errors.root && (
            <p className="text-center text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
          {t("TEXT.haveAccount")}{" "}
          <Link href="/auth/login">
            <span className="text-primary cursor-pointer font-medium hover:underline">
              {t("NAV.login")}
            </span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
