"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import PasswordField from "../util/formFields/PasswordField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { resetPassword } from "@/services/ClientApiHandler";
import { ForgatPasswordFormType } from "@/helper/schema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { appStore } from "@/stores/app";

interface ChangePasswordFormProps {
  form: UseFormReturn<ForgatPasswordFormType>;
}

const ChangePasswordForm = ({ form }: ChangePasswordFormProps) => {
  const t = useTranslations();
  const [localLoading, setLocalLoading] = useState(false);
  const { phone, code, resetCode } = appStore((state) => state.verify);

  const { handleSubmit } = useFormSubmission<ForgatPasswordFormType>(form, {
    submitFunction: resetPassword,
    onSuccessPath: "/auth/login",
  });

  const submit = async () => {
    form.clearErrors();
    setLocalLoading(true);
    try {
      const data: ForgatPasswordFormType = {
        phone_code: code!,
        password: form.watch("password"),
        password_confirmation: form.watch("password_confirmation"),
        reset_code: resetCode!,
        phone: phone!,
      };
      await handleSubmit(data);
    } finally {
      setLocalLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <PasswordField
        control={form.control}
        name="password"
        placeholder={t("labels.newPassword")}
        isLoading={isSubmitting || localLoading}
      />
      <PasswordField
        control={form.control}
        name="password_confirmation"
        placeholder={t("labels.confirmNewPassword")}
        isLoading={isSubmitting || localLoading}
      />
      {form.formState.errors.root && (
        <p className="text-sm text-red-500">
          {form.formState.errors.root.message}
        </p>
      )}
      <Button
        type="button"
        className="w-full"
        onClick={submit}
        disabled={isSubmitting || localLoading}
      >
        {isSubmitting || localLoading
          ? t("buttons.loading")
          : t(`buttons.submit`)}
      </Button>
    </>
  );
};

export default ChangePasswordForm;
