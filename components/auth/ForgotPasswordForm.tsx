"use client";

import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgatPasswordFormType, ForgatPasswordSchema } from "@/helper/schema";
import dynamic from "next/dynamic";
import ChangePasswordForm from "./ChangePassword";
import { appStore } from "@/stores/app";

const OTPForm = dynamic(() => import("./OTPForm"), {
  ssr: false,
});

const ForgotPasswordForm = () => {
  const t = useTranslations();
  const { phone, code, type } = appStore((state) => state.verify);
  const [tab, setTab] = useState<"send" | "next" | "submit">(
    type === "register" ? "next" : "send",
  );
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const formSchema = ForgatPasswordSchema({ t, currentPhoneLimit });

  const form = useForm<ForgatPasswordFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reset_code: "",
      phone: type === 'register'?phone as string:'',
      password_confirmation: "",
      password: "",
      phone_code: type === 'register'?code as string:"20",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        {tab !== "submit" ? (
          <OTPForm
            form={form as unknown as ReturnType<typeof useForm<OtpFormValues>>}
            setTab={setTab}
            tab={tab}
            currentPhoneLimit={currentPhoneLimit}
            setCurrentPhoneLimit={setCurrentPhoneLimit}
          />
        ) : (
          <ChangePasswordForm form={form} />
        )}
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
