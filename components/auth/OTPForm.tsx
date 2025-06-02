"use client";
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ChangeNumberForm } from "./ChangeNumberForm";
import {
  forgotPassword,
  verifyForgotPassword,
} from "@/services/ClientApiHandler";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { FieldPath, useForm } from "react-hook-form";
import usePhoneCode from "@/hooks/usePhoneCode";
import PhoneNumber from "../util/formFields/PhoneInput";
import { appStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";

const VERIFICATION_CODE_LENGTH = 4;
const RESEND_TIMER_SECONDS = 60;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

function OTPForm<T extends OtpFormValues>({
  form,
  setTab,
  tab,
  currentPhoneLimit,
  setCurrentPhoneLimit,
}: {
  form: ReturnType<typeof useForm<T>>;
  setTab: (value: "next" | "send" | "submit") => void;
  tab: "next" | "send" | "submit";
  currentPhoneLimit: number | null;
  setCurrentPhoneLimit: (value: number | null) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });
  const verify = appStore((state) => state.verify);
  const setVerify = appStore((state) => state.setVerify);

  const phoneCode = form.watch("phone_code" as FieldPath<T>);
  const phone = form.watch("phone" as FieldPath<T>);
  const resetCode = form.watch("reset_code" as FieldPath<T>);

  const resendCode = async (data: { phone_code: string; phone: string }) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data);
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
      setTab("next");
      return res;
    } finally {
      setIsLoading(false);
    }
  };
  const setUser = useAuthStore((statue) => statue.setUser);
  const verifycode = async (formData: {
    phone_code: string;
    phone: string;
    reset_code: string;
  }) => {
    setVerify({ ...verify, resetCode: formData.reset_code });
    return await verifyForgotPassword(
      formData,
      verify.type === "register"
        ? "verify_phone"
        : "verify_forgot_password_code",
    );
  };

  const { handleSubmit: resendCodeHandler } = useFormSubmission<
    Omit<OtpFormValues, "reset_code">
  >(
    form as unknown as ReturnType<
      typeof useForm<Omit<OtpFormValues, "reset_code">>
    >,
    {
      submitFunction: resendCode,
    },
  );

  const { handleSubmit: verifyHandler } = useFormSubmission<OtpFormValues>(
    form as unknown as ReturnType<typeof useForm<OtpFormValues>>,
    {
      submitFunction: verifycode,
      onSuccessPath: verify.type === "register" ? "/" : undefined,
    },
  );

  const handleSubmit = async () => {
    form.clearErrors();
    if (tab === "send") {
      setVerify({ ...verify, phone,code:phoneCode });
      await resendCodeHandler({
        phone_code: phoneCode,
        phone: phone,
      });
      return;
    }
    setVerify({
      ...verify,
      resetCode: resetCode,
    })
    const res = await verifyHandler({
      phone_code: phoneCode,
      phone: verify.phone!,
      reset_code: resetCode,
    });
    if (res.status === "success") {
      if (verify.type === "register") {
        const user = res.data as User;
        setUser(user);
        return;
      }
      setTab("submit");
    }
  };

  const handleResendCode = async () => {
    await resendCodeHandler({
      phone_code: verify.code!,
      phone: verify.phone!,
    });
  };

  useEffect(() => {
    if (tab !== "next") {
      return;
    }

    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, tab]);

  useEffect(() => {
    if (tab === "next") {
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
    }
  }, [tab]);
  useEffect(() => {
    if (verify.type === "register")
      resendCode({ phone: verify.phone!, phone_code: verify.code! });
  }, [verify.type]);

  return (
    <>
      {tab === "send" ? (
        <PhoneNumber
          control={form.control}
          phoneCodeName={"phone_code" as FieldPath<T>}
          phoneNumberName={"phone" as FieldPath<T>}
          countries={countries}
          currentPhoneLimit={currentPhoneLimit}
        />
      ) : (
        <>
         {verify.type !== 'register'&& <div className="mb-6">
            <ChangeNumberForm form={form} onClick={resendCodeHandler} />
          </div>}

          <FormField
            control={form.control}
            name={"reset_code" as FieldPath<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={VERIFICATION_CODE_LENGTH}
                    value={field.value || ""}
                    onChange={(value) => {
                      if (!/^\d*$/.test(value)) {
                        return;
                      }
                      field.onChange(value);
                    }}
                    className="flex justify-center gap-5"
                  >
                    {[...Array(VERIFICATION_CODE_LENGTH)].map((_, index) => (
                      <InputOTPGroup key={index} className="justify-center">
                        <InputOTPSlot
                          index={index}
                          className="!text-primary focus:border-primary focus:ring-primary size-12 rounded-md text-center !text-2xl font-bold md:size-16"
                        />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {tab === "next" && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {t("verification.didntReceiveCode")}{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading || !canResend}
                  className={`font-medium ${
                    canResend
                      ? "text-primary cursor-pointer hover:underline"
                      : "cursor-not-allowed text-gray-400"
                  }`}
                >
                  {t("links.resend")}
                </button>
              </span>
              <span className="text-gray-600">{formatTime(timeLeft)}</span>
            </div>
          )}
        </>
      )}

      <Button
        className="w-full"
        type="button"
        onClick={handleSubmit}
        disabled={
          (tab === "send" &&
            form.watch("phone" as FieldPath<T>).length !== currentPhoneLimit) ||
          (tab === "next" &&
            form.watch("reset_code" as FieldPath<T>).length <
              VERIFICATION_CODE_LENGTH)
        }
      >
        {isLoading ? t("buttons.loading") : t(`buttons.${tab}`)}
      </Button>
    </>
  );
}

export default OTPForm;
