"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import usePhoneCode from "@/hooks/usePhoneCode";
import { useEffect, useState } from "react";
import PhoneNumber from "../util/formFields/PhoneInput";
import Field from "../util/formFields/FormField";
import { Form } from "../ui/form";
import ChangePhoneModal from "../auth/ChangePhoneModal";
import ProfileImage from "./PofileImage";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { updateUserProfile } from "@/services/ClientApiHandler";
import { profileFromType, profileSchema } from "@/helper/schema";
import { useAuthStore } from "@/stores/auth";

import { FadeIn } from "@/components/animations"; 

function ProfileForm({
  defaultValues,
}: {
  defaultValues: {
    full_name: string;
    phone_code: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
  };
}) {
  const t = useTranslations();

  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );

  const formSchema = profileSchema({ t });
  const { updated, phone } = useAuthStore((state) => state.verify);
  const form = useForm<profileFromType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
    mode: "onChange",
  });
  const { handleSubmit } = useFormSubmission(form, {
    submitFunction: async(data)=>{
      delete data.avatar
      return await updateUserProfile(data)
    },
  });

  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const isSubmitting = false;

  useEffect(() => {
    if (updated) {
      form.setValue("phone", phone!);
    }
  }, [form, phone, updated]);

  return (
    <div className="my-8 grid grid-cols-1 items-center gap-4 md:grid-cols-2">
      <FadeIn direction="right" duration={0.7} delay={0.2}>
        <ProfileImage avatar={defaultValues.avatar} />
      </FadeIn>
      <FadeIn
        direction="left"
        duration={0.7}
        delay={0.4}
        className="mx-auto w-126 max-w-[95%]"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Field
              control={form.control}
              name="full_name"
              placeholder={t("labels.fullName")}
              label={t("labels.fullName")}
            />
            <PhoneNumber
              control={form.control}
              phoneCodeName={"phone_code"}
              phoneNumberName={"phone"}
              countries={countries}
              currentPhoneLimit={currentPhoneLimit}
              disabled
            />
            <div className="text-primary text-end font-medium">
              <ChangePhoneModal isProfile />
            </div>
            <Field
              control={form.control}
              name="email"
              placeholder={t("labels.email")}
              label={t("labels.email")}
            />
            <Field
              control={form.control}
              name="address"
              placeholder={t("labels.address")}
              label={t("labels.address")}
            />
            {form.formState.errors.root && (
              <p className="text-center text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("buttons.loading") : t(`buttons.submit`)}
            </Button>
          </form>
        </Form>
      </FadeIn>
    </div>
  );
}

export default ProfileForm;