import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

function ConfirmModal({
  title,
  desc,
  open,
  setOpen,
  onClick,
}: {
  title: string;
  desc: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onClick: () => Promise<void>;
}) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const confirmationHandler = async () => {
    setLoading(true);
    try {
        await onClick();
        setOpen(false);
    } catch (error: unknown) {
        console.error(error);
    }finally{
        setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-backgroud max-w-[95%] rounded-2xl border-0 px-4 shadow-xl [&>button:last-child]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="text-text text-center text-xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sub">{desc}</DialogDescription>
        <div className="flex w-full justify-end gap-4 px-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="!h-10 cursor-pointer"
            disabled={loading}
          >
            {t("labels.cancel")}
          </Button>
          <Button
            onClick={confirmationHandler}
            className="!h-10 cursor-pointer rounded-xl px-6"
            disabled={loading}
          >
            {t("buttons.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
