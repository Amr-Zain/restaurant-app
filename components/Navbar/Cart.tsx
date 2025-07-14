"use client";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "../cart";
import { useCartStore } from "@/stores/cart";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { CartIcon } from "../Icons";

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const cartItemsLen = useCartStore((state) => state.totalItems);
  const t = useTranslations();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="nav-icon relative">
          <CartIcon />
          {!!cartItemsLen && (
            <span className="border-backgroud bg-primary absolute end-2 top-2 flex size-4.5 items-center justify-center rounded-full border-2 text-[8px] font-semibold text-white">
              {cartItemsLen}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-180 max-w-[100%] gap-0 rounded-r-2xl border-e-1"
      >
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-lg">
            {t("cart.title")}{" "}
            <span className="text-sub self-end text-sm">
              ({t("cart.items", { count: cartItemsLen })})
            </span>
          </SheetTitle>
        </SheetHeader>
        <Cart closeSheet={()=>setOpen(false)} />
        {!!cartItemsLen && (
          <Link href={"/checkout"} className="px-4">
            <Button
              variant={"default"}
              className="my-2 !h-10 !w-full"
              onClick={() => setOpen(false)}
            >
              {t("cart.checkoutButton")}
            </Button>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default CartModal;
