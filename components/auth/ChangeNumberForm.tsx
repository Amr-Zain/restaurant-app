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
import { Control, FieldValues } from "react-hook-form";

export function ChangeNumberForm<T extends FieldValues>({
  isLoading,
  control,
  onClick,
}: {
  isLoading: boolean;
  control: Control<T>;
  onClick: () => Promise<void>;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    await onClick();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-primary cursor-pointer text-sm font-medium underline">
          {t("links.editPhoneNumber")}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Number</DialogTitle>
          <DialogDescription>
            please enter your phone number so we can verify it
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PhoneNumber control={control} />
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
