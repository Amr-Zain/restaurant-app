"use client";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "../skelton/SkeltonCards";
import { useAddressStore } from "@/stores/address";
import Item from "../orders/orderDetails/Item";
import map from "@/assets/images/map.png";
import AddAddressForm from "./AddressForm";
import { Button } from "../ui/button";
const AddressModal = ({
  open,
  onOpenChange,
  onAddressClick,
  className,
}: {
  open: boolean;
  className?: string;
  onAddressClick?: (item: Address) => void;
  onOpenChange: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const { data, isLoading, fetchAdderss, deleteFromAdderss, setUpdate } =
    useAddressStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    fetchAdderss();
  }, [fetchAdderss]);
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          onClick={(e) => e.stopPropagation()}
          className={"w-110 max-w-[95%] rounded-r-2xl border-r-1 " + className}
          side="left"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="text-text text-xl font-semibold">
              {t("profile.myAddress")}
            </SheetTitle>
          </SheetHeader>
          <div
            className={"flex h-full flex-col justify-between overflow-x-auto"}
          >
            {isLoading ? (
              <CardsSkeleton length={2} />
            ) : !data.length ? (
              <p>{t("TEXT.noAdderss")}</p>
            ) : (
              <div className="px-4">
                {data.map((item) => (
                  <div
                    key={`address ${item.id}`}
                    onClick={() => {
                      if (onAddressClick) onAddressClick(item);
                    }}
                  >
                    <Item
                      id={item.id}
                      title={item.title}
                      desc={item.desc!}
                      image={map}
                      onDelete={(
                        event: React.MouseEvent<HTMLButtonElement>,
                      ) => {
                        event.stopPropagation();
                        deleteFromAdderss(item.id);
                      }}
                      onUpdate={(
                        event: React.MouseEvent<HTMLButtonElement>,
                      ) => {
                        // Add type here
                        event.stopPropagation();
                        setUpdate({ id: item.id });
                        setIsFormOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            type="button"
            variant={"default"}
            className="m-4"
            onClick={() => setIsFormOpen(true)}
          >
            Add new address
          </Button>
        </SheetContent>
      </Sheet>
      <AddAddressForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setUpdate({ id: null, isUpdate: false });
        }}
      />
    </>
  );
};

export default AddressModal;
