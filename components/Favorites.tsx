// Favorites.jsx
"use client";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useFavoritesStore } from "@/stores/favorites";
import Item from "./orders/orderDetails/Item";
import { CardsSkeleton } from "./skelton/SkeltonCards";
const Favorites = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const { data, isLoading, fetchFavorites, deleteFromFavorites } =
    useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onClick={(e) => e.stopPropagation()}
        className="rounded-r-2xl border-r-1"
        side="left"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="text-text text-xl font-semibold">
            {t("profile.favorite")}
          </SheetTitle>
        </SheetHeader>
        <div>
          {isLoading ? (
            <CardsSkeleton length={4} />
          ) : !data.length ? (
            <p>{t("TEXT.noFavorits")}</p>
          ) : (
            <div className="px-4">
              {data.map((item) => (
                <Item
                  key={`favorite ${item.id}`}
                  id={item.id}
                  title={item.name}
                  desc={item.desc!}
                  image={item.image}
                  price={item.price.price}
                  currency={item.price.currency}
                  onDelete={() => deleteFromFavorites(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Favorites;
