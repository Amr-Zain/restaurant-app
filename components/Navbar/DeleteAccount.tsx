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
import { deleteAccount } from "@/services/ClientApiHandler";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { Trash } from "../Icons";
import { cn } from "@/lib/utils";

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const handleConfirm = async () => {
    try {
      const res = await deleteAccount();
      if (res.status === "success") {
        toast.success(res.message);
        router.replace("/");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Error Deleting your account",
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className={cn("nav-item p-3", "p-4 !text-red-600")}>
            <div className="nav-icon !text-red-600">

          <Trash />
            </div>
          {t("TEXT.deleteAccount")}
        </div>
      </DialogTrigger>

      <DialogContent className="bg-backgroud max-w-[95%] rounded-2xl border-0 px-4 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-text text-center text-xl font-semibold">
            {t("TEXT.deleteAccount")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sub">
          {t("TEXT.deleteAccountDesc")}
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
            onClick={handleConfirm}
            className="!h-10 cursor-pointer rounded-xl px-6"
          >
            {t("labels.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccount;
