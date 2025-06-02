import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem";
import OrderSummary from "../orders/orderDetails/OrderSummary";

function Cart() {
  const { items, totalPrice } = useCartStore((state) => state);
  const orderSummary = {
    title: "Order Summary",
    items: [
      { label: "Subtotal", value: totalPrice },
      { label: "Shipping Fee", value: 0 },
      { label: "Discount", value: 0 },
    ],
    totalAmount: { label: "Total", value: totalPrice },
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {items.map((item) => (
          <CartItem
            id={item.id}
            title={item.name}
            quantity={item.quantity}
            selectedToppings={item.selectedToppings}
            image={item.imageUrl}
            price={item.price}
            key={`cartItem ${item.id}`}
          />
        ))}
      </div>
      <OrderSummary {...orderSummary} />
    </div>
  );
}

export default Cart;
