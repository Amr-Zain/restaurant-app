"use client";

import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PhoneFormType, phoneSchema } from "@/helper/schema";
import { appStore } from "@/stores/app";
import PhoneNumber from "../util/formFields/PhoneInput";
import usePhoneCode from "@/hooks/usePhoneCode";
import { Button } from "../ui/button";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { forgotPassword } from "@/services/ClientApiHandler";

const PhoneForm = ({ isModal,onClose }: { isModal?: boolean,onClose?:()=>void }) => {
  const t = useTranslations();
  const { phone, code } = appStore((state) => state.verify);

  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const formSchema = phoneSchema({ t, currentPhoneLimit });

  const form = useForm<PhoneFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: phone || "",
      phone_code: code || "20",
    },
    mode: "onChange",
  });
  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const setVerify = appStore((state) => state.setVerify);
  const { handleSubmit } = useFormSubmission<PhoneFormType>(form, {
    submitFunction: forgotPassword,
    onSuccessPath: isModal ? undefined : "/auth/verification",
    onSuccess: () =>{
      setVerify({
        type: "reset",
        code: form.watch("phone_code"),
        phone: form.watch("phone"),
        resetCode: null,
      })
      if(onClose)onClose();
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <PhoneNumber
          control={form.control}
          phoneCodeName={"phone_code"}
          phoneNumberName={"phone"}
          countries={countries}
          currentPhoneLimit={currentPhoneLimit}
        />
        <Button className="w-full" type="submit">
          {false ? t("buttons.loading") : t(`buttons.submit`)}
        </Button>
      </form>
    </Form>
  );
};

export default PhoneForm;
