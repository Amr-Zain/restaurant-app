"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useTranslations } from "next-intl";
import { Loyalty, Wallet } from "../Icons";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useCartStore } from "@/stores/cart";

function CardModal({ type }: { type: "cridtCard" | "loyaltyCard" }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("card");
  const { full_name, points, wallet } = useAuthStore((state) => state.user!);
  const currency = useCartStore((state) => state.currency);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {type === "cridtCard" ? (
          <div className={"nav-item p-3"}>
            <div className="nav-icon">
              <Wallet className="hover:!bg-primary size-5" />
            </div>
            {t("cridtCard")}
          </div>
        ) : (
          <div className={"nav-item p-3"}>
            <div className="nav-icon">
              <Loyalty className="hover:!bg-primary size-5" />
            </div>
            {t("loyaltyCard")}
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="bg-backgroud w-170 max-w-[95%] rounded-2xl border-0 px-2 shadow-xl md:px-4 [&>button:last-child]:hidden">
        <div className="bg-primary relative aspect-video w-full overflow-hidden rounded-2xl">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white md:text-2xl">
                {full_name}
              </h3>
              <Image src={logo} alt="logo" width={80} height={80} />
            </div>
            <div className="flex flex-col text-white sm:gap-2 md:gap-4">
              <div className="text-ms font-semibold md:text-lg">
                {type === "cridtCard" ? t("cridtCard") : t("loyaltyCard")}
              </div>
              <div className="flex h-7 gap-1 text-sm md:text-lg">
                <div className="font-semibold">
                  {type === "cridtCard" ? wallet : points}
                </div>
                <div className="self-end text-sm">
                  {type === "cridtCard" ? currency : t("points")}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -end-[2%] -bottom-[30%] aspect-square w-[55%] rounded-full bg-white/5" />
          <div className="absolute -start-[30%] bottom-0 flex aspect-square h-full items-center justify-center rounded-full bg-white/5">
            <div className="aspect-square h-[75%] rounded-full bg-white/5" />
          </div>
        </div>
        <div>
          <h3 className="text-text text-xl font-bold">
            {t("Transaction History")}
          </h3>
          <div className="p-4">
            {/* list of tansactions */}
            <p className="text-sub text-center">{t("No transactions")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
