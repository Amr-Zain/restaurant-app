"use client";

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
import VerifyModal from "./VerifyModal";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ChangePhoneModal({
  isProfile = false,
}: {
  isProfile?: boolean;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="text-primary cursor-pointer text-sm font-medium underline">
            {t("links.editPhoneNumber")}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] [&>button:last-child]:hidden">
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute end-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>{t("TEXT.changePhone")}</DialogTitle>
            <DialogDescription>{t("TEXT.changePhoneDesc")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <PhoneForm
              isModal
              onClose={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setIsVerifyOpen(true);
                }, 100);
              }}
              isProfile={isProfile}
            />
          </div>
        </DialogContent>
      </Dialog>
      <VerifyModal isOpen={isVerifyOpen} setIsOpen={setIsVerifyOpen} />
    </>
  );
}
