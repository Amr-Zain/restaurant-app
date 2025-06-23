"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

import { OTPSchema, OTPSchemaType } from "@/helper/schema";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useResendTimer } from "@/hooks/useResendTimer";
import { useVerificationActions } from "@/hooks/useVerificationActions";

import { Form } from "../ui/form";
import { Button } from "../ui/button";
import ChangePhoneModal from "./ChangePhoneModal";
import OTPInput from "./OTPInput";
import ResendCodeSection from "./ResendCodeSection";

interface VerifyFormProps {
  isProfile?: boolean;
  onClose?: () => void;
}

const VerifyForm = ({ isProfile = false, onClose }: VerifyFormProps) => {
  const t = useTranslations();
  const router = useRouter();

  const {
    isLoading,
    resendCode,
    verifyCode,
    onVerifySuccess,
    verify,
    setVerify,
  } = useVerificationActions(isProfile, onClose);

  const { timeLeft, canResend, resetTimer } = useResendTimer();

  // Form setup
  const formSchema = OTPSchema({ t });
  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { reset_code: "" },
    mode: "onSubmit",
  });

  const resetCode = form.watch("reset_code");

  const { handleSubmit: resendCodeHandler } = useFormSubmission(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    form,
    { submitFunction: resendCode },
  );

  const { handleSubmit: verifyHandler } = useFormSubmission(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    form,
    {
      submitFunction: verifyCode,
      onSuccessPath: isProfile
        ? undefined
        : verify.type === "register"
          ? "/"
          : "/auth/forgot-password",
      onSuccess: onVerifySuccess,
    },
  );

  const handleFormSubmit = async (values: OTPSchemaType) => {
    setVerify({ ...verify, resetCode: values.reset_code });

    await verifyHandler({
      phone_code: verify.code!,
      phone: verify.phone!,
      reset_code: resetCode,
    });
  };

  const handleResendCode = async () => {
    const result = await resendCodeHandler({
      phone_code: verify.code!,
      phone: verify.phone!,
    });

    if (result) {
      resetTimer();
    }
  };

  useEffect(() => {
    if (!verify.code || !verify.phone) {
      router.back();
      return;
    }

    const initializeForm = async () => {
      if (verify.type === "register") {
        await resendCode({
          phone: verify.phone!,
          phone_code: verify.code!,
        });
      }
      resetTimer();
    };

    initializeForm();
  }, [verify.code, verify.phone, verify.type, router, resendCode, resetTimer]);

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        {verify.type !== "register" && (
          <div className="mb-6">
            <ChangePhoneModal isProfile={isProfile} />
          </div>
        )}

        <OTPInput control={form.control} name="reset_code" />

        <ResendCodeSection
          timeLeft={timeLeft}
          canResend={canResend}
          isLoading={isLoading}
          onResend={handleResendCode}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? t("buttons.loading") : t("buttons.next")}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
