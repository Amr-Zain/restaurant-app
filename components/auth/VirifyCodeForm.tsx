"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChangeNumberForm } from "./ChangeNumberForm";
import PhoneNumber from "../util/formFields/PhoneInput";

const VERIFICATION_CODE_LENGTH = 4;
const RESEND_TIMER_SECONDS = 60;
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const VerifyPhoneForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [tab, setTab] = useState<"send" | "next">("send");
  const formSchema = z.object({
    code: z.string().default('').optional(),
    phoneCode: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneCode") })),
    phoneNumber: z
      .string()
      .min(1, t("requiredField", { field: t("labels.phoneNumber") }))
      .regex(/^[0-9]{10,15}$/, t("invalidPhoneNumber")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleResendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeLeft(RESEND_TIMER_SECONDS);
      setCanResend(false);
      form.setValue("code", "");
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 1500);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (tab === "send") {
      handleResendCode(); //values.phoneCode, values.phoneNumber
      setTab("next");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }

    const currentCode = form.getValues("code").split("");
    currentCode[index] = value;
    const newCode = currentCode.join("");

    form.setValue("code", newCode, { shouldValidate: true });

    if (value && index < VERIFICATION_CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const currentCode = form.getValues("code")!.split("");
      currentCode[index - 1] = "";
      form.setValue("code", currentCode.join(""), { shouldValidate: true });
    } else if (e.key === "ArrowRight" && index < VERIFICATION_CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleChangeNumber = async() => {
    handleResendCode(); //values.phoneCode, values.phoneNumber
    setTab("next");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {tab === "send" ? (
          <PhoneNumber control={form.control} />
        ) : (
          <>
            <div className="mb-6">
              <ChangeNumberForm
                isLoading={isLoading}
                control={form.control}
                onClick={handleChangeNumber}
              />
            </div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center gap-3">
                      {[
                        ...Array.from({ length: VERIFICATION_CODE_LENGTH }),
                      ].map((_, index) => (
                        <Input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="!text-primary focus:border-primary focus:ring-primary size-12 rounded-md text-center !text-2xl font-bold md:size-16"
                          value={field.value[index] || ""}
                          onChange={(e) => handleInputChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      ))}
                    </div>
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
          </>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={
            isLoading ||
            (form.watch("code")!.length < VERIFICATION_CODE_LENGTH &&
              tab === "next")
          }
        >
          {isLoading ? t("buttons.loading") : t(`buttons.${tab}`)}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyPhoneForm;
