"use client"
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";

function Field<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  checkbox,
  ...rest
}: {
  control: Control<TFieldValues>; // Use the generic Control type
  label: string;
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  checkbox?: boolean;
  [key: string]: unknown;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
      <FormItem className={checkbox?"!flex mb-2":''}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            { checkbox ? (
              <Checkbox
              className="-order-1"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            ) : (
              <Input  placeholder={placeholder} {...field} {...rest} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Field;
