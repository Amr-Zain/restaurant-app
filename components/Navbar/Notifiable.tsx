"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Bell } from "../Icons";
import { Switch } from "../ui/switch";
import { useAuthStore } from "@/stores/auth";

function Notifiable() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const isNotifiable = useAuthStore((state) => state.user?.notifiable);
  const taggleNotify = useAuthStore((state) => state.setNotifiable);
  const isLoading = useAuthStore((state) => state.isLoading);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex justify-between items-center">
          <div className={"nav-item p-3"}>
            <div className="nav-icon">
              <Bell className="size-5" />
            </div>
            {t("NAV.notification")}
          </div>
          <Switch
            dir="ltr"
            checked={isNotifiable}
            className="data-[state=checked]:bg-primary scale-120 cursor-pointer"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-backgroud max-w-[95%] rounded-2xl border-0 px-4 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-text text-center text-xl font-semibold">
            {t("TEXT.changeNotifications")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sub">
          {t("TEXT.changeNotificationsDesc")}
        </DialogDescription>
        <div className="flex w-full justify-end gap-4 px-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="!h-10 cursor-pointer"
          >
            {t("labels.cancel")}
          </Button>
          <Button
            onClick={async () => {
              taggleNotify();
              setOpen(false);
            }}
            className="!h-10 cursor-pointer rounded-xl px-6"
          >
            {isLoading ? t("buttons.loading") : t("buttons.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Notifiable;
