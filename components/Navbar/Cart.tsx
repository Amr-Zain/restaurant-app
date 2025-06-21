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

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const cartItemsLen = useCartStore((state) => state.totalItems);
  const t = useTranslations();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative nav-icon">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50001 8.41986V7.44986C7.50001 5.19986 9.31001 2.98986 11.56 2.77986C12.1852 2.71844 12.8163 2.78859 13.4127 2.9858C14.0091 3.18301 14.5577 3.50291 15.023 3.92491C15.4883 4.34691 15.8602 4.86166 16.1145 5.43603C16.3689 6.01041 16.5002 6.63168 16.5 7.25986V8.63986M9.00001 22.7499H15C19.02 22.7499 19.74 21.1399 19.95 19.1799L20.7 13.1799C20.97 10.7399 20.27 8.74986 16 8.74986H8.00001C3.73001 8.74986 3.03001 10.7399 3.30001 13.1799L4.05001 19.1799C4.26001 21.1399 4.98001 22.7499 9.00001 22.7499Z"
              stroke="#BDC1DF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.495 12.75H15.505M8.495 12.75H8.503"
              stroke="#BDC1DF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!!cartItemsLen && (
            <span className="border-backgroud bg-primary absolute end-2 top-2 size-4 rounded-full border-2 flex justify-center items-center text-[8px] font-semibold text-white">
              {cartItemsLen}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-180 max-w-[100%] rounded-r-2xl border-r-1 "
      >
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-lg">
            {t('cart.title')}{" "}
            <span className="text-sub text-sm self-end ">
              ({t('cart.items',{count:cartItemsLen})})
            </span>
          </SheetTitle>
        </SheetHeader>
          <Cart />
      </SheetContent>
    </Sheet>
  );
};
export default CartModal;
