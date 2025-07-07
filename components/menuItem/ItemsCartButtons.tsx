"use client";
import { Loader2, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useItemDetailsStore } from "@/stores/itemDitails";
import { useCartStore } from "@/stores/cart";
import { CartIcon } from "../Icons";
import { useTranslations } from "next-intl";
import SuccessPopup from "../util/SuccessPopup";
import { useState } from "react";

function ItemCardButtons({
  id,
  price,
  currency,
}: {
  id: number;
  price: number;
  currency: string;
}) {
  const { quantity, selectedModifiers, setQuantity } = useItemDetailsStore(
    (state) => state,
  );
  const [openSuccess,setOpenSuccess] = useState(false)
  const isLoading = useCartStore((state) => state.isLoading.addItem);
  const addToCart = useCartStore((state) => state.addItem);
  const t = useTranslations();

  const calculateCurrentPrice = () => {
    let currentPrice = price;
    currentPrice += selectedModifiers.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    return currentPrice * quantity;
  };

  const addToCartHandler = async () => {
    await addToCart({
      product_id: id,
      price: calculateCurrentPrice(),
      quantity,
      sub_modifiers: selectedModifiers,
    });
    setOpenSuccess(true)
  };
  return (
    <div className="mb-4 flex items-center  md:justify-end justify-center gap-4">
      <div className="border-primary/20 flex h-12 items-center space-x-1 rounded-lg border p-2">
        <Button
          variant="ghost"
          size="icon"
          disabled={quantity === 1||isLoading}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          
          className="text-primary size-8 sm:size-10 cursor-pointer"
        >
          <Minus size={25} />
        </Button>
        <span className="text-text w-5 sm:w-8 cursor-pointer text-center sm:text-lg font-bold">
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
          disabled={isLoading}
          className="text-primary size-8 sm:size-10 cursor-pointer"
        >
          <Plus size={25} />
        </Button>
      </div>
      <Button
        onClick={addToCartHandler}
        disabled={isLoading}
        className="!h-12 !min-w-40 cursor-pointer rounded-lg px-8 py-3 text-sm font-semibold text-white sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <CartIcon />
            {t("buttons.addToCart") +
              " " +
              calculateCurrentPrice().toFixed(2)}{" "}
            <span className="self-end text-[.6rem]">{currency}</span>
          </>
        )}
      </Button>
      <SuccessPopup
        cancelLabel="Continue Shopping"
        cancelUrl={"/"}
        open={openSuccess}
        setOpen={setOpenSuccess}
        successLabel={"Checkout"}
        successUrl={"/checkout"}
      />
    </div>
  );
}

export default ItemCardButtons;
