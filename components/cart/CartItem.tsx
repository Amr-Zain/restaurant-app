import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart";

function CartItem({
  id,
  title,
  image,
  selectedToppings,
  price,
  quantity,
}: {
  id: string;
  title: string;
  selectedToppings: { name: string; price: number | null; quantity: number }[];
  image: string | StaticImageData;
  price: number;
  quantity: number;
}) {
  const updateItem = useCartStore((state) => state.updateItemQuantity);
  const deleteItem = useCartStore((state) => state.removeItem);
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
          <div className="flex gap-4 justify-between">
            <div>
              <CardTitle className="text-md">{title}</CardTitle>
              <CardDescription className="text-sub line-clamp-2 text-sm">
                {selectedToppings.map(topping=>`${topping.quantity}x ${topping.name}, `)}
              </CardDescription>
            </div>
            <div onClick={()=>deleteItem(id)} className="text-red-500"><Trash2 size={18} /></div>
          </div>
          <div className="flex gap-6 justify-between">
            <div className="text-text text-sm font-semibold">{price}EGP</div>
            <div className="border-primary/20 flex w-fit items-center rounded-full border px-1">
              <Button
                variant="outline"
                size="icon"
                disabled={quantity === 1}
                onClick={() => updateItem(id, Math.max(1, quantity - 1))}
                className="size-6 border-0"
              >
                <Minus size={20} />
              </Button>
              <span className="w-8 text-center text-sm font-bold text-gray-900">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateItem(id, quantity + 1)}
                className="size-6 border-0"
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
