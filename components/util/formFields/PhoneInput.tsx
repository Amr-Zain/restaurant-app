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

function PhoneNumber<T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) {
  const t = useTranslations();

  return (
    <FormField<T>
      control={control}
      name={"phoneNumber" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2">
            <FormField
              control={control}
              name={"phoneCode" as FieldPath<T>}
              render={({ field: phoneCodeField }) => (
                <Select
                  onValueChange={phoneCodeField.onChange}
                  defaultValue={phoneCodeField.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-1/4">
                      <SelectValue placeholder={t("labels.phoneCode")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="+20">+20</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FormControl>
              <Input
                {...field}
                placeholder={t("labels.phone")}
                className="w-3/4"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PhoneNumber;
