import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import PhoneForm from "./PhoneForm";

export default function ChangePhoneModal() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  
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
            Please enter your phone number so we can verify it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PhoneForm isModal onClose={()=>setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
