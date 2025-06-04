"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumber from "../util/formFields/PhoneInput";
import PasswordField from "../util/formFields/PasswordField";
import Field from "../util/formFields/FormField";
import usePhoneCode from "@/hooks/usePhoneCode";
import { LoginFormType, loginSchema } from "@/helper/schema";
import { login } from "@/services/ClientApiHandler";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useAuthStore } from "@/stores/auth";

const LoginForm = () => {
  const t = useTranslations();
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );

  const formSchema = useMemo(
    () => loginSchema({ t, currentPhoneLimit }),
    [currentPhoneLimit, t],
  );

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_code: "20",
    },
  });
  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const isLoading = form.formState.isLoading;
  const setAuthedUser = useAuthStore((state) => state.setUser);
  const { handleSubmit: handleLogin } = useFormSubmission<LoginFormType>(form, {
    submitFunction: login,
    onSuccessPath: "/",
  });
  const handleSubmit = async (data: LoginFormType) => {
    const res = await handleLogin(data);
    if (res.status === "success") setAuthedUser(res.data as User);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-4">
          <PhoneNumber
            control={form.control}
            phoneCodeName="phone_code"
            phoneNumberName="phone"
            countries={countries}
            currentPhoneLimit={currentPhoneLimit}
          />

          <PasswordField
            control={form.control}
            name="password"
            placeholder={t("labels.password")}
            isLoading={isLoading}
          />
          <div className="flex items-center justify-between">
            <Field
              control={form.control}
              name="rememberMe"
              checkbox
              label={t("labels.rememberMe")}
              disabled={isLoading}
            />
            <Link href="/auth/forgot-password">
              <span className="text-primary cursor-pointer text-sm font-medium hover:underline">
                {t("labels.forgetPassword")}
              </span>
            </Link>
          </div>
        </div>
        {form.formState.errors.root && (
          <p className="text-center text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("buttons.loading") : t("buttons.login")}
        </Button>

        <div className="mt-4 text-center text-sm">
          {t("TEXT.noAccount")}{" "}
          <Link href="/auth/register">
            <span className="text-primary cursor-pointer font-medium hover:underline">
              {t("TEXT.signUpNow")}
            </span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
