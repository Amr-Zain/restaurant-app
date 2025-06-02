"use client";

import Item from "../menuItem/Item";
import Toppings from "../menuItem/Toppings";
import { useState } from "react";
import ItemReviews from "../menuItem/Reviews";
import image from "@/assets/images/slider/slide1.jpg";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CartIcon } from "../Icons";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";

const item = {
  id: 1,
  name: "Pepperoni pizza",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  imageUrl: image as unknown as string,
  isFavorit: true,
  price: 120.5,
  rating: 4.5,
  totalReviews: 120,
  sizes: [
    { label: "Single (+150)EGP", value: "single", price: 150 },
    { label: "Double (+250 EGP)", value: "double", price: 250 },
    { label: "Triple (+500 EGP)", value: "triple", price: 500 },
  ],
  toppings: [
    { name: "Onion", price: 2.0 },
    { name: "Mushroom", price: "free" },
    { name: "Extra Cheese", price: 3.0 },
    { name: "Olives", price: 1.0 },
    { name: "Bell Pepper", price: 1.75 },
  ],
};

const toppings: Omit<Topping, "quantity">[] = [
  { name: "Onion", price: 20.0, weight: 70 },
  { name: "Mushroom", price: null, weight: 70 },
  { name: "Extra Cheese", price: 30.0, weight: 70 },
  { name: "Olives", price: 10.0, weight: 70 },
  { name: "Bell Pepper", price: 10.75, weight: 70 },
];
export default function ItemDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>(item.sizes[0].value);
  const addToCart = useCartStore((state) => state.addItem);
  const deleteFromCart = useCartStore((state) => state.removeItem);
  const calculateCurrentPrice = () => {
    let currentPrice =
      item.sizes.find((s) => s.value === selectedSize)?.price || 0;
    currentPrice += selectedToppings.reduce(
      (acc, curr) => acc + (curr.price || 0) * curr.quantity,
      0,
    );
    return currentPrice * quantity;
  };
  const addToCartHandler = () => {
    addToCart({
      id: String(item.id),
      imageUrl: item.imageUrl,
      name: item.name,
      price: item.sizes.find((s) => s.value === selectedSize)!.price,
      quantity,
      selectedToppings,
      selectedSize,
    });
    toast(`item ${item.name} Added to the cart`, {
      description: "Added Successfully",
      action: {
        label: "Undo",
        onClick: () => deleteFromCart(item.id.toString()),
      },
    });
  };
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Item
        review_count={item.totalReviews}
        rating={item.rating}
        name={item.name}
        isFavorit={item.isFavorit}
        id={item.id}
        imageUrl={item.imageUrl}
        description={item.description}
      />

      <div className="mb-6">
        <h3 className="mb-3 text-xl font-semibold text-gray-800">Size</h3>
        <RadioGroup
          defaultValue={selectedSize}
          onValueChange={setSelectedSize}
          className="flex flex-col gap-4 sm:flex-row"
        >
          {item.sizes.map((size) => (
            <div key={size.value} className="flex items-center space-x-2">
              <RadioGroupItem value={size.value} id={size.value} />
              <Label htmlFor={size.value} className="text-text">
                {size.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Toppings
        toppings={toppings}
        setSelectedToppings={setSelectedToppings}
        selectedToppings={selectedToppings}
      />

      <div className="mb-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
        <div className="border-primary/20 flex items-center space-x-1 rounded-lg border p-2">
          <Button
            variant="outline"
            size="icon"
            disabled={quantity === 1}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="size-8 border-0 cursor-pointer"
          >
            <Minus size={20} />
          </Button>
          <span className="w-8 text-center text-sm font-bold text-text cursor-pointer">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="size-8 border-0 cursor-pointer"
          >
            <Plus size={20} />
          </Button>
        </div>
        <Button
          onClick={addToCartHandler}
          className="!h-12 rounded-lg px-8 py-3 text-sm font-semibold text-white sm:w-auto cursor-pointer"
        >
          <CartIcon />
          Add to Cart {calculateCurrentPrice().toFixed(2)}{" "}
          <span className="self-end text-[.6rem]">EGP</span>
        </Button>
      </div>

      <ItemReviews itemId={item.id} />
    </div>
  );
}
