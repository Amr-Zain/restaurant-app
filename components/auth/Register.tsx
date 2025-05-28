"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneNumber from "../util/formFields/PhoneInput";
import Field from "../util/formFields/FormField";
import PasswordField from "../util/formFields/PasswordField";

const RegisterForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, t("requiredField", { field: t("labels.name") }))
      .max(50, t("errors.nameTooLong")),
    phoneCode: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phoneNumber: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
      .regex(/^[0-9]{10,15}$/, t("invalidPhoneNumber")),
    email: z
      .string()
      .min(1, t("requiredField", { field: t("labels.email") }))
      .email(t("errors.invalidEmail")),
    password: z
      .string()
      .min(1, t("requiredField", { field: t("labels.password") }))
      .min(8, t("passwordTooShort")),
    rememberMe: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneCode: "+20",
      phoneNumber: "",
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Registering user:", values);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration successful!");
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Field
          control={form.control}
          name="name"
          placeholder={t("labels.name")}
          label=""
          disabled={isLoading}
        />
        <Field
          control={form.control}
          name="email"
          type="email"
          placeholder={t("labels.email")}
          label=""
          disabled={isLoading}
        />
        <PhoneNumber control={form.control} />

        <PasswordField
          control={form.control}
          name="password"
          placeholder={t("labels.password")}
          isLoading={isLoading}
        />
        <Field
          control={form.control}
          name="rememberMe"
          checkbox
          label={t("labels.rememberMe")}
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("buttons.loading") : t("buttons.register")}
        </Button>

        <div className="mt-0 text-center text-sm">
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
