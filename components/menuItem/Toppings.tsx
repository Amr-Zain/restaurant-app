import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

function Toppings({
  toppings,
  setSelectedToppings,
  selectedToppings,
}: {
  toppings: Omit<Topping,'quantity'>[];
  selectedToppings: Topping[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<Topping[]>>;
}) {
  const handleToppingChange = (
    toppingName: string,
    toppingPrice: number | null,
    action: "add" | "remove",
  ) => {
    setSelectedToppings((prev) => {
      const existingToppingIndex = prev.findIndex(
        (topping) => topping.name === toppingName,
      );

      if (action === "add") {
        if (existingToppingIndex > -1) {
          const newSelectedToppings = [...prev];
          newSelectedToppings[existingToppingIndex].quantity += 1;
          return newSelectedToppings;
        } else {
          return [
            ...prev,
            {
              name: toppingName,
              price: typeof toppingPrice === "number" ? toppingPrice : null,
              quantity: 1,
            },
          ];
        }
      } else {
        if (existingToppingIndex > -1) {
          const newSelectedToppings = [...prev];
          if (newSelectedToppings[existingToppingIndex].quantity > 0) {
            newSelectedToppings[existingToppingIndex].quantity -= 1;
          }
          if (newSelectedToppings[existingToppingIndex].quantity === 0) {
            return newSelectedToppings.filter(
              (_, index) => index !== existingToppingIndex,
            );
          }
          return newSelectedToppings;
        }
        return prev;
      }
    });
  };

  const getToppingCount = (toppingName: string) => {
    const topping = selectedToppings.find((t) => t.name === toppingName);
    return topping ? topping.quantity : 0;
  };

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xl font-semibold text-gray-800">Topping</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {toppings.map((topping) => (
          <div
            key={topping.name}
            className="flex items-center justify-between rounded-md bg-white p-3"
          >
            <div className="text-text flex flex-col font-medium">
              <div>
                <span className="font-medium">{topping.name}</span>
                <span className="text-sm font-medium">
                  {typeof topping.price === "number"
                    ? ` (+${topping.price.toFixed(2)} EGP)`
                    : ` (free)`}
                </span>
              </div>
              <div className="text-sub">{"(" + topping.weight + ")"} gm</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handleToppingChange(topping.name, topping.price, "remove")
                }
                disabled={getToppingCount(topping.name) === 0}
                className="size-8 rounded-sm cursor-pointer"
              >
                <Minus size={16} />
              </Button>
              <span className="w-6 text-center font-semibold text-gray-800">
                {getToppingCount(topping.name)}
              </span>
              <Button
                variant="default"
                size="icon"
                onClick={() =>
                  handleToppingChange(topping.name, topping.price, "add")
                }
                className="size-8 !h-8 rounded-sm cursor-pointer"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toppings;
