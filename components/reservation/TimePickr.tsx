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
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    hours: "06",
    minutes: "00",
    seconds: "00",
    period: "PM",
  });

  useEffect(() => {
    if (value) {
      const [timePart, period] = value.split(" ");
      const [hours, minutes, seconds] = timePart.split(":");
      setTime({
        hours: hours.padStart(2, "0"),
        minutes: minutes.padStart(2, "0"),
        seconds: (seconds || "00").padStart(2, "0"),
        period: period || "PM",
      });
    }
  }, [value]);

  const handleTimeChange = (type: keyof typeof time, val: string) => {
    setTime((prev) => ({ ...prev, [type]: val }));
  };

  const handleConfirm = () => {
    onChange(`${time.hours}:${time.minutes}:${time.seconds} ${time.period}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="reserv-input flex justify-between !px-0"
        >
          <span>{value || t("form.selectTime")}</span>
          <Clock className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-backgroud rounded-2xl border-0 shadow-xl sm:max-w-[400px]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            {t("form.selectTime")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-1 py-4">
          <ScrollableTimeColumn
            items={generateNumbers(1, 12)}
            value={time.hours}
            onChange={(val) => handleTimeChange("hours", val)}
          />
          <div className="px-1 text-2xl font-light text-gray-400">:</div>
          <ScrollableTimeColumn
            items={generateNumbers(0, 59)}
            value={time.minutes}
            onChange={(val) => handleTimeChange("minutes", val)}
          />
          <div className="px-1 text-2xl font-light text-gray-400">:</div>
          <ScrollableTimeColumn
            items={generateNumbers(0, 59)}
            value={time.seconds}
            onChange={(val) => handleTimeChange("seconds", val)}
          />
          <div className="w-4"></div>
          <ScrollableTimeColumn
            items={["AM", "PM"]}
            value={time.period}
            onChange={(val) => handleTimeChange("period", val)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="h-12 flex-1 text-gray-500 hover:bg-gray-100"
          >
            {t("form.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="h-12 flex-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
          >
            {t("form.ok")}
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
  const itemHeight = 40; // Height of each item
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const index = items.findIndex((item) => item === value);
      if (index !== -1) {
        // Center the selected item
        const scrollTop = index * itemHeight;
        containerRef.current.scrollTop = scrollTop;
      }
    }
  }, [value, items, isScrolling]);

  const handleScroll = () => {
    if (containerRef.current) {
      setIsScrolling(true);
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      if (items[clampedIndex] !== value) {
        onChange(items[clampedIndex]);
      }

      // Clear scrolling flag after a short delay
      setTimeout(() => setIsScrolling(false), 150);
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
                ? "text-lg font-medium text-gray-800"
                : "text-base text-gray-400",
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

//ScrollableTimeColumn.displayName = "ScrollableTimeColumn";

function TimePickerField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
}: {
  control: Control<TFieldValues>;

  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className={className}>
            <TimePicker value={field.value || ""} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { TimePicker, TimePickerField };
