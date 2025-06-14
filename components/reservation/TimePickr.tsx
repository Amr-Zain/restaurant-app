"use client";
import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { generateNumbers } from "@/helper/functions";

const TimePicker = ({
  value,
  onChange,
  placeholder, 
  disabled,
  className
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; 
  className?: string; 
  disabled?: boolean; 
}) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    hours: "06",
    minutes: "00",
    period: "PM",
  });

  useEffect(() => {
    if (value) {
      const parts = value.split(" ");
      const timePart = parts[0]; 
      const period = parts[1] || "PM"; 

      const [hours, minutes] = timePart.split(":");

      setTime({
        hours: hours.padStart(2, "0"),
        minutes: minutes.padStart(2, "0"),
        period: period,
      });
    } else {
      setTime({
        hours: "06",
        minutes: "00",
        period: "PM",
      });
    }
  }, [value]);

  const handleTimeChange = (type: keyof typeof time, val: string) => {
    setTime((prev) => ({ ...prev, [type]: val }));
  };

  const handleConfirm = () => {
    onChange(`${time.hours}:${time.minutes} ${time.period}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={"flex cursor-pointer justify-between !px-0 "+className}
          disabled={disabled} 
        >
          <span>{value || placeholder || t("labels.selectTime")}</span>{" "}
          <Clock className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-backgroud w-fit rounded-2xl border-0 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            {t("labels.selectTime")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-1">
          <ScrollableTimeColumn
            items={generateNumbers(1, 12).map((n) => String(n).padStart(2, "0"))} 
            value={time.hours}
            onChange={(val) => handleTimeChange("hours", val)}
          />
          <div className="px-1 text-2xl font-light text-gray-400">:</div>
          <ScrollableTimeColumn
            items={generateNumbers(0, 59).map((n) => String(n).padStart(2, "0"))}
            value={time.minutes}
            onChange={(val) => handleTimeChange("minutes", val)}
          />

          <div className="w-4"></div>
          <ScrollableTimeColumn
            items={["AM", "PM"]}
            value={time.period}
            onChange={(val) => handleTimeChange("period", val)}
          />
        </div>

        <div className="flex justify-end w-full gap-4 px-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="!h-10 cursor-pointer"
          >
            {t("labels.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="!h-10 px-6 rounded-xl cursor-pointer"
          >
            {t("labels.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ScrollableTimeColumn = ({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const index = items.findIndex((item) => item === value);
      if (index !== -1) {
        const scrollTop = index * itemHeight;
        containerRef.current.scrollTop = scrollTop;
      }
    }
  }, [value, items, isScrolling, itemHeight]);

  const handleScroll = () => {
    if (containerRef.current) {
      setIsScrolling(true);
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      if (items[clampedIndex] !== value) {
        onChange(items[clampedIndex]);
      }

      clearTimeout((containerRef.current as any).scrollTimeout);
      (containerRef.current as any).scrollTimeout = setTimeout(() => setIsScrolling(false), 200); 
    }
  };

  return (
    <div className="relative h-32 w-20">
      <div
        ref={containerRef}
        className="scrollbar-hide h-full overflow-y-scroll"
        onScroll={handleScroll}
        style={{
          scrollSnapType: "y mandatory",
          paddingTop: `${itemHeight}px`,
          paddingBottom: `${itemHeight}px`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={cn(
              "relative z-30 flex items-center justify-center transition-all duration-200",
              value === item
                ? "text-lg font-medium text-text"
                : "text-base text-sub",
            )}
            style={{
              height: `${itemHeight}px`,
              scrollSnapAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

function TimePickerField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  placeholder, 
  disabled, 
}: {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
  placeholder?: string; 
  disabled?: boolean; 
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>} 
          <FormControl className={className}>
            <TimePicker
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder} 
              disabled={disabled} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { TimePicker, TimePickerField };