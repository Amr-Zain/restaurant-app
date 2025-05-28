"use client";

import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "../util/formFields/PasswordField";
import { Form } from "../ui/form";

const ChangePasswordForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z
    .object({
      newPassword: z
        .string()
        .min(1, t("requiredField", { field: t("labels.newPassword") }))
        .min(8, t("passwordTooShort")),
      confirmPassword: z
        .string()
        .min(1, t("requiredField", { field: t("labels.confirmPassword") })),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("errors.passwordsMismatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Changing password:", values.newPassword);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Password changed successfully!");
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PasswordField
          control={form.control}
          name="newPassword"
          placeholder={t("labels.newPassword")}
          isLoading={isLoading}
        />
        <PasswordField
          control={form.control}
          name="confirmPassword"
          placeholder={t("labels.confirmNewPassword")}
          isLoading={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("buttons.loading") : t("buttons.confirm")}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
