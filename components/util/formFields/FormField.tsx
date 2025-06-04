"use client";
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
import { Textarea } from "@/components/ui/textarea";

function Field<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  checkbox,
  textarea,
  ...rest
}: {
  control: Control<TFieldValues>; 
  label?: string;
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  checkbox?: boolean;
  textarea?: boolean;
  [key: string]: unknown;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={checkbox ? "mb-2 !flex" : ""}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {checkbox ? (
              <Checkbox
                className="-order-1"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            ) : textarea ? (
              <Textarea
                placeholder={placeholder}
                rows={5}
                {...field}
                {...rest}
              />
            ) : (
              <Input placeholder={placeholder} {...field} {...rest} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Field;
