"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import { cancelOrder } from "@/services/ClientApiHandler";
import { toast } from "sonner";
import useWebSocket from "@/hooks/useWebSocket";
import { useRouter } from "@/i18n/routing";

function CancelOrder({
  canCancel,
  id,
  status,
}: {
  canCancel: boolean;
  id: string;
  status: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const [canCancelState, setCanCancel] = useState(canCancel);
  const [statusState, setStatus] = useState(status);
  const router = useRouter();
  const cancelOrderHandler = async () => {
    try {
      setLoading(true);
      const res = await cancelOrder(id);
      if (res.status === "success") {
        setCanCancel(false);
        setStatus("customer_cancel");
        setOpen(false);
        toast.success(res.message);
      }
    } catch (error: unknown) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        error.response.data.message || "Error in order cancel",
      );
    } finally {
      setLoading(false);
    }
  };
  const { isStatusUpdated, setIsStatusUpdated } = useWebSocket();
  if (isStatusUpdated) {
    router.refresh();
    setIsStatusUpdated(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button
          variant={"ghost"}
          disabled={!canCancelState}
          className={`cursor-pointer px-0 font-bold text-red-600 hover:bg-transparent`}
        >
          {statusState === "customer_cancel"
            ? t("TEXT.cancelled")
            : t("TEXT.cancelOrder")}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-backgroud max-w-[95%] rounded-2xl border-0 px-4 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-text text-center text-xl font-semibold">
            {t("TEXT.cancelOrder")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sub">
          {t("TEXT.cancelOrderDes")}
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
            onClick={cancelOrderHandler}
            className="!h-10 cursor-pointer rounded-xl px-6"
            disabled={loading}
          >
            {loading ? t("buttons.loading") : t("labels.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CancelOrder;
