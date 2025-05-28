"use client";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; 

interface SelectFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  label?: string; 
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  items: { value: string; label: string | React.ReactNode }[];
  triggerClassName?: string; 
  contentClassName?: string; 
}

function SelectField<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  items,
  triggerClassName,
  contentClassName,
}: SelectFieldProps<TFieldValues>) {
  return (
    <FormField<TFieldValues>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>} 
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={field.disabled}
          >
            <FormControl>
              <SelectTrigger className={cn("w-full", triggerClassName)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={cn(contentClassName)}>
              {items.map((item, index) => (
                <SelectItem key={item.value || index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectField;