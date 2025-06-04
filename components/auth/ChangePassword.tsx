"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import PasswordField from "../util/formFields/PasswordField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { resetPassword } from "@/services/ClientApiHandler";
import { ForgatPasswordFormType, ForgatPasswordSchema } from "@/helper/schema";
import { appStore } from "@/stores/app";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePasswordForm = () => {
  const t = useTranslations();
  const { phone, code, resetCode } = appStore((state) => state.verify);
  const clearVerify = appStore((state) => state.clearVerify);
  const formSchema = ForgatPasswordSchema({ t });
  const form = useForm<ForgatPasswordFormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const { handleSubmit } = useFormSubmission<ForgatPasswordFormType>(form, {
    submitFunction: async (values: ForgatPasswordFormType) =>
      await resetPassword({
        ...values,
        phone: phone!,
        phone_code: code!,
        reset_code: resetCode!,
      }),
    onSuccessPath: "/auth/login",
    onSuccess:()=>clearVerify()
  });

  const submit = async (values: ForgatPasswordFormType) => {
    const data = {
      phone_code: code,
      password: values.password,
      password_confirmation: values.password_confirmation,
      reset_code: resetCode!,
      phone: phone!,
    };
    await handleSubmit(data);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(submit)}>
        <PasswordField
          control={form.control}
          name="password"
          placeholder={t("labels.newPassword")}
          isLoading={isSubmitting}
        />
        <PasswordField
          control={form.control}
          name="password_confirmation"
          placeholder={t("labels.confirmNewPassword")}
          isLoading={isSubmitting}
        />
        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t("buttons.loading") : t(`buttons.submit`)}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
