"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumber from "../util/formFields/PhoneInput";
import PasswordField from "../util/formFields/PasswordField";
import Field from "../util/formFields/FormField";

const LoginForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    phoneCode: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phoneNumber: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
      .regex(/^[0-9]{10,15}$/, t("invalidPhoneNumber")),
    password: z
      .string()
      .min(1, t("requiredField", { field: t("labels.password") }))
      .min(8, t("passwordTooShort")),
    rememberMe: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneCode: "+20",
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Submitted:", values);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <PhoneNumber control={form.control} />

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
