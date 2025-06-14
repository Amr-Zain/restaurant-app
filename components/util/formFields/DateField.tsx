'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Control, FieldPath, FieldValues } from "react-hook-form";

function DateFields<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  className
}: {
  control: Control<TFieldValues>; 
  label: string;
  className: string;
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  checkbox?: boolean;
  [key: string]: unknown;
}) {
  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label&&<FormLabel className="font-medium text-gray-700">
            {label}
          </FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 border-gray-200 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  {field.value ? (
                    format(field.value, "dd/MM/yyyy")
                  ) : (
                    <span>{/* t("labels.datePlaceholder") */ placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4  !text-text" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  date > threeMonthsLater
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DateFields;
