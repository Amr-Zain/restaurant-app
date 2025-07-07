import Image from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { Loader2 } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { Trash } from "../Icons";

interface SubModifier {
  item_modifiers: ItemModifier[];
}

function CartItem({
  cart_product_id,
  slug,
  title,
  image,
  sub_modifiers,
  price,
  quantity,
  isCheckout
}: {
  id: number;
  title: string;
  sub_modifiers: SubModifier[];
  image: string;
  slug: string;
  price: number;
  cart_product_id: number;
  quantity: number;
  isCheckout?: boolean;
}) {
  const updateItem = useCartStore((state) => state.updateItemQuantity);
  const deleteItem = useCartStore((state) => state.removeItem);
  const currency = useCartStore((state) => state.currency);
  const {
    itemId,
    removeItem: isRemoving,
    updateItemQuantity: isUpdatingQuantity,
  } = useCartStore((state) => state.isLoading);
  const isLoadingUpdate = isUpdatingQuantity && itemId === cart_product_id;
  const isLoadingRemove = isRemoving && itemId === cart_product_id;
  const pathname = usePathname();
  return (
    <Card className="border-primary/20 mb-2 !w-full gap-2 bg-white p-2 shadow-none transition-shadow hover:shadow-sm sm:w-136">
      <div className="flex gap-2">
        <div className="relative aspect-video w-28 shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="h-full rounded-xl object-cover"
          />
        </div>
        <div className="flex grow-1 flex-col gap-2">
          <div className="flex justify-between gap-4">
            <div>
              <Link href={`/menu/${slug}`}>
                <CardTitle className="text-md line-clamp-1 cursor-pointer">
                  {title}
                </CardTitle>
              </Link>
              <CardDescription className="text-sub line-clamp-2 text-sm">
                {sub_modifiers
                  .map((sub_modifier) =>
                    sub_modifier.item_modifiers.map(
                      (item) => `${item.quantity}x ${item.name}`,
                    ),
                  )
                  .join(", ")}
              </CardDescription>
            </div>
           {!isCheckout&& <Button
              variant={"ghost"}
              disabled={isLoadingRemove || isLoadingUpdate}
              onClick={() => {
                deleteItem(cart_product_id);
              }}
              className={`cursor-pointer text-red-500 hover:bg-transparent ${isLoadingRemove ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isLoadingRemove ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash className="size-5" />
              )}
            </Button>}
          </div>
          <div className="flex justify-between gap-6">
            <div className="text-text text-sm font-semibold">
              {price} {currency}
            </div>
            {!isCheckout&&<div className="border-primary/20 flex w-fit items-center rounded-full border">
              <Button
                variant="outline"
                size="icon"
                disabled={quantity === 1 || isLoadingRemove || isLoadingUpdate}
                onClick={() => {
                  updateItem(cart_product_id, Math.max(1, quantity - 1));
                  pathname.split("/").at(-1);
                 
                }}
                className="size-6 cursor-pointer border-0"
              >
                <Minus size={20} />
              </Button>
              <span className="w-8 text-center text-sm font-bold text-gray-900">
                {isLoadingUpdate ? (
                  <Loader2 size={16} className="inline-block animate-spin" />
                ) : (
                  quantity
                )}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateItem(cart_product_id, quantity + 1);
               
                }}
                disabled={isLoadingRemove || isLoadingUpdate}
                className="size-6 cursor-pointer border-0"
              >
                <Plus size={20} />
              </Button>
            </div>}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
