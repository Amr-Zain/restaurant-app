"use client";
import { Loader2, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useItemDetailsStore } from "@/stores/itemDitails";
import { useCartStore } from "@/stores/cart";
import { CartIcon } from "../Icons";

function ItemCardButtons({
  id,
  price,
  currency,
}: {
  id: number;
  price: number;
  currency: string;
}) {
  const { quantity, selectedModifiers, setQuantity } =
    useItemDetailsStore((state) => state);
  const isLoading = useCartStore((state) => state.isLoading.addItem);
  const addToCart = useCartStore((state) => state.addItem);

 /*  useEffect(() => {
     resetItemDetails();
     
  }, [id, resetItemDetails]);
 */
  const calculateCurrentPrice = () => {
    let currentPrice = price;
    currentPrice += selectedModifiers.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    return currentPrice * quantity;
  };

  const addToCartHandler = async () => {
    addToCart({
      product_id: id,
      price: calculateCurrentPrice(),
      quantity,
      sub_modifiers: selectedModifiers,
    });
    //resetItemDetails();
  };
  return (
    <div className="mb-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
      <div className="border-primary/20 flex items-center space-x-1 rounded-lg border p-2">
        <Button
          variant="outline"
          size="icon"
          disabled={quantity === 1}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="size-8 cursor-pointer border-0 bg-backgroud"
        >
          <Minus size={20} />
        </Button>
        <span className="text-text w-8 cursor-pointer text-center text-sm font-bold">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
          className="size-8 cursor-pointer border-0 bg-backgroud"
        >
          <Plus size={20} />
        </Button>
      </div>
      <Button
        onClick={addToCartHandler}
        disabled={isLoading}
        className="!h-12 cursor-pointer rounded-lg px-8 py-3 text-sm font-semibold text-white sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <CartIcon />
            Add to Cart {calculateCurrentPrice().toFixed(2)}{" "}
            <span className="self-end text-[.6rem]">{currency}</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default ItemCardButtons;
