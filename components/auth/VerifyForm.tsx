"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { OTPSchema, OTPSchemaType } from "@/helper/schema";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  forgotPassword,
  verifyForgotPassword,
} from "@/services/ClientApiHandler";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { Button } from "../ui/button";
import { appStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import ChangePhoneModal from "./ChangePhoneModal";
import { formatTime } from "@/helper/functions";
import { useRouter } from "@/i18n/routing";

const VERIFICATION_CODE_LENGTH = 4;
const RESEND_TIMER_SECONDS = 60;

const VerifyForm = () => {
  const t = useTranslations();
  const formSchema = OTPSchema({ t });

  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reset_code: "",
    },
    mode: "onSubmit",
  });
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const verify = appStore((state) => state.verify);
  const setVerify = appStore((state) => state.setVerify);

  const resetCode = form.watch("reset_code");
  const router = useRouter()
  const resendCode = async (data: { phone_code: string; phone: string }) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data);
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
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
      onSuccessPath: verify.type === "register" ? "/" : "/auth/forgot-password",
      onSuccess: (res) => {
        if (res.status !== "success") return;
        if (verify.type === "register") {
          const user = res.data as User;
          setUser(user);
        }
      },
    },
  );

  const handleSubmit = async (values: OTPSchemaType) => {
    setVerify({
      ...verify,
      resetCode: values.reset_code,
    });
    await verifyHandler({
      phone_code: verify.code!,
      phone: verify.phone!,
      reset_code: resetCode,
    });
  };

  const handleResendCode = async () => {
    await resendCodeHandler({
      phone_code: verify.code!,
      phone: verify.phone!,
    });
  };

  useEffect(() => {
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
  }, [timeLeft]);

  useEffect(() => {
    if(!verify.code || !verify.phone ) return router.back();
    (async () => {
      if (verify.type === "register")
        await resendCode({ phone: verify.phone!, phone_code: verify.code! });
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
    })();
  }, [verify.code, verify.phone, verify.type]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        {verify.type !== "register" && (
          <div className="mb-6">
            <ChangePhoneModal />
          </div>
        )}

        <FormField
          control={form.control}
          name={"reset_code"}
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

        <Button className="w-full" type="submit">
          {isLoading ? t("buttons.loading") : t(`buttons.next`)}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
