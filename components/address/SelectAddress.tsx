"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import map from "@/assets/images/map.png";

import { RadioGroup } from "../ui/radio-group";
import { StoreRadioCard } from "../stores/StoreRadioCard";
import { StoresRadioSkeleton } from "../stores/StoresRadioSkeleton";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useAddressStore } from "@/stores/address";
import OrderItem from "../orders/orderDetails/Item";

const SelectAddress = ({
  open,
  onOpenChange,
  onAddressClick,
  address,
}: {
  open: boolean;
  onAddressClick: (item: Address) => void;
  onOpenChange: (value: boolean) => void;
  address: Address;
}) => {
  const t = useTranslations();
  const { data, isLoading } = useAddressStore();

  const handleConfirm = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <OrderItem
            className="border-0 bg-white shadow-none"
            id={address?.id}
            image={map}
            title={address?.title || t("checkout.selectAnAddress")}
            desc={address?.desc as string}
          />
        </div>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="bg-backgroud w-128 max-w-[90%] rounded-2xl border-0 px-4 shadow-xl"
      >
        <DialogHeader className="pb-4 sm:text-start">
          <DialogTitle className="text-text text-center text-xl font-semibold">
            {t("labels.selectAddress")}
          </DialogTitle>
        </DialogHeader>
        <div>
          <RadioGroup
            value={address?.id?.toString()}
            onValueChange={(id) => {
              const selectedAddress = data.find(
                (address) => address.id === +id,
              );
              if (selectedAddress) {
                onAddressClick(selectedAddress);
              }
            }}
            className="flex w-full flex-col gap-4"
          >
            {isLoading ? (
              <StoresRadioSkeleton length={3} />
            ) : data.length > 0 ? (
              data.map((addressItem) => (
                <StoreRadioCard
                  key={"address-" + addressItem.id}
                  branch={
                    {
                      id: addressItem.id,
                      location_description: addressItem.desc,
                      name: addressItem.title,
                      image: map,
                    } as unknown as Branch
                  }
                  currentBranchId={address?.id}
                />
              ))
            ) : (
              <p className="text-sub text-center">
                {t("TEXT.noAddressesFound")}
              </p>
            )}
          </RadioGroup>
          {data.length > 0 && (
            <Button
              className="mt-6 flex !h-10 !w-full justify-center"
              onClick={handleConfirm}
              disabled={!address || isLoading}
            >
              {t("labels.confirm")}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectAddress;
