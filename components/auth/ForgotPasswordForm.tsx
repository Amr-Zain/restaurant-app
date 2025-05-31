"use client";

import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgatPasswordFormType, ForgatPasswordSchema } from "@/helper/schema";
import dynamic from "next/dynamic";
import ChangePasswordForm from "./ChangePassword";

const OTPForm = dynamic(() => import("./OTPForm"), {
  ssr: false,
});

const ForgotPasswordForm = () => {
  const t = useTranslations();
  const [tab, setTab] = useState<"send" | "next" | "submit">("send");
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const formSchema = ForgatPasswordSchema({ t, currentPhoneLimit });

  const form = useForm<ForgatPasswordFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reset_code: "",
      phone: phone,
      password_confirmation: "",
      password: "",
      phone_code: "20",
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
            setCode={setCode}
            setPhone={setPhone}
            tab={tab}
            phone={phone}
            currentPhoneLimit={currentPhoneLimit}
            setCurrentPhoneLimit={setCurrentPhoneLimit}
          />
        ) : (
         <ChangePasswordForm code={code} phone={phone} form={form} />
        )}
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
