import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import PhoneNumber from "../util/formFields/PhoneInput";
import { FieldPath, FieldValues, useForm } from "react-hook-form";
import usePhoneCode from "@/hooks/usePhoneCode";

export function ChangeNumberForm<T extends FieldValues>({
  form,
  onClick,
}: {
  form: ReturnType<typeof useForm<T>>;
  onClick: ({
    phone_code,
    phone,
  }: {
    phone_code: string;
    phone: string;
  }) => Promise<SubmissionResult>;
}) {
  const t = useTranslations();
  const [currentPhoneLimit, setCurrentPhoneLimit] = useState<number | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { countries } = usePhoneCode({ form, setCurrentPhoneLimit });

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await onClick({
        phone_code: form.watch("phone_code" as FieldPath<T>) as string,
        phone: form.watch("phone" as FieldPath<T>) as string,
      });
      if (res.status === "success") setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen || isLoading} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-primary cursor-pointer text-sm font-medium underline">
          {t("links.editPhoneNumber")}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Number</DialogTitle>
          <DialogDescription>
            Please enter your phone number so we can verify it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PhoneNumber
            control={form.control}
            phoneCodeName={"phone_code" as FieldPath<T>}
            phoneNumberName={"phone" as FieldPath<T>}
            countries={countries}
            currentPhoneLimit={currentPhoneLimit}
            isLoading={isLoading}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleClick}
            className="!h-12 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
