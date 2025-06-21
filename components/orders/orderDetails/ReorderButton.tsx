"use client";

import { Button } from "@/components/ui/button";
import { Reorder } from "@/services/ClientApiHandler";
import { useCartStore } from "@/stores/cart";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

function ReorderButton({ id }: { id: number }) {
  const t = useTranslations();
  const fetchCartItems= useCartStore(state=>state.fetchCartItems)
  const handleReorder = async () => {
    try {
      const res = await Reorder(id);
      if (res.status === "success") {
        fetchCartItems();
        toast.success(res.message);
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "error on reorder please try again later",
      );
    }
  };
  return (
    <Button onClick={handleReorder} className="ml-auto !h-10 cursor-pointer">
      {t("buttons.reorder")}
    </Button>
  );
}

export default ReorderButton;
