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
        <DialogContent className="sm:max-w-[425px]">
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
