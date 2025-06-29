"use client";
import { use, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useTranslations } from "next-intl";
import { Loyalty, Wallet } from "../Icons";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Item from "../orders/orderDetails/Item";
interface CardModalProps {
  type: "cridtCard" | "loyaltyCard";
  data: Promise<Wallet>;
}

function CardModal({ type, data }: CardModalProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("card");
  const full_name = useAuthStore((state) => state.user!.full_name);
  const promisedData = use(data);
  if (!data) return;
  const isCreditCard = type === "cridtCard";
  const cardTitle = isCreditCard ? t("cridtCard") : t("loyaltyCard");
  const cardIcon = isCreditCard ? (
    <Wallet className="hover:!bg-primary size-5" />
  ) : (
    <Loyalty className="hover:!bg-primary size-5" />
  );

  const cardValue = isCreditCard
    ? `${promisedData?.bending_balance} ${promisedData?.currency}`
    : t("points", { count: promisedData.points || 0 });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex items-center justify-between">
          <div className={"nav-item p-3"}>
            <div className="nav-icon">{cardIcon}</div>
            {cardTitle}
          </div>
          <div className="text-success rounded-full bg-success/10 px-4 py-2 text-sm font-semibold">
            {cardValue}
          </div>
        </div>
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
                {cardTitle}
              </div>
              <div className="flex h-7 gap-1 text-sm md:text-lg">
                <div className="font-semibold">{cardValue}</div>
              </div>
            </div>
          </div>
          <div className="absolute -end-[2%] -bottom-[30%] aspect-square w-[55%] rounded-full bg-white/5" />
          <div className="absolute -start-[30%] bottom-0 flex aspect-square h-full items-center justify-center rounded-full bg-white/5">
            <div className="aspect-square h-[75%] rounded-full bg-white/5" />
          </div>
        </div>
        <div>
          <h3 className="text-text mb-2 text-xl font-bold">
            {t("Transaction History")}
          </h3>
          <div className="h-50 overflow-y-auto p-4">
            {promisedData?.transactions.length ? (
              <>
                {promisedData.transactions.map((trans) => (
                  <Item
                    key={trans.id}
                    id={trans.id}
                    title={trans.title}
                    desc={trans.created_at}
                    price={isCreditCard ? trans.amount : undefined}
                    currency={
                      isCreditCard
                        ? promisedData.currency
                        : t("points", { count: promisedData.points })
                    }
                    image={trans.image}
                  />
                ))}
              </>
            ) : (
              <p className="text-sub text-center">{t("No transactions")}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
