"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReservationForm from "@/components/reservation/ReservationForm";

export default function Reservation() {
  const t = useTranslations("NAV");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{t("Reservation")}</div>
      </DialogTrigger>

      <DialogContent className="h-[90vh] max-h-[90vh] w-[700px] max-w-full overflow-hidden rounded-3xl p-0">
        <ReservationForm className="pb-4" onClick={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
