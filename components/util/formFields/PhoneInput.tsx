'use client';

import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";

interface CountryCodeData {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

interface PhoneNumberProps<T extends FieldValues> {
  control: Control<T>;
  phoneCodeName: FieldPath<T>;
  phoneNumberName: FieldPath<T>;
  countries: CountryCodeData[];
  currentPhoneLimit?: number | null;
  isLoading?:boolean;
}

function PhoneNumber<T extends FieldValues>({
  control,
  phoneCodeName,
  phoneNumberName,
  countries,
  currentPhoneLimit,
  isLoading
}: PhoneNumberProps<T>) {
  const t = useTranslations();
  
  return (
    <div className="flex gap-2">
      <FormField<T>
        control={control}
        name={phoneCodeName}
        render={({ field }) => (
          <FormItem className="min-w-8 ">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger className="text-text">
                  <SelectValue placeholder={t("labels.phoneCode")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries?.map((country) => (
                  <SelectItem
                    key={country.id}
                    value={`${country.phone_code}`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{`+${country.phone_code}`}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<T>
        control={control}
        name={phoneNumberName}
        render={({ field }) => (
          <FormItem className="grow-1">
            <FormControl>
              <Input
                {...field}
                onChange={(e)=>{
                  field.onChange(e);
                }}
                value={field.value || ''}
                disabled={isLoading}
                placeholder={
                  currentPhoneLimit
                    ? t("labels.phoneNumberWithLimit", { limit: currentPhoneLimit })
                    : t("labels.phoneNumber")
                }
                type="tel"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default PhoneNumber;