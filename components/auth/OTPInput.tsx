"use client";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Control, FieldPath, FieldValues } from "react-hook-form";

const VERIFICATION_CODE_LENGTH = 4;

function OTPInput<TFieldValues extends FieldValues>({
  control,
  name,
  onChange,
}: {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  onChange?: (value: string) => void;
}) {
  const handleOTPChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    onChange?.(value);
  };

  const renderOTPSlots = () =>
    [...Array(VERIFICATION_CODE_LENGTH)].map((_, index) => (
      <InputOTPGroup key={index} className="justify-center">
        <InputOTPSlot
          index={index}
          className="!text-primary focus:border-primary focus:ring-primary size-12 rounded-md text-center !text-2xl font-bold md:size-16"
        />
      </InputOTPGroup>
    ));

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputOTP
              maxLength={VERIFICATION_CODE_LENGTH}
              value={field.value || ""}
              onChange={(value) => {
                handleOTPChange(value);
                field.onChange(value);
              }}
              className="flex justify-center gap-5"
            >
              {renderOTPSlots()}
            </InputOTP>
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
}

export default OTPInput;
