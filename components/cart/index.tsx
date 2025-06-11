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
  console.log(items)
  return (
    <div className="flex h-full flex-col justify-between px-4">
      {!items.length ? (
        <div className="flex flex-col justify-center items-center h-full ">
          <h3 className="text-text font-medium">No products</h3>
          <p className="text-sub">
            {"You don't have any products yet in your cart"}
          </p>
        </div>
      ) : (
        <>
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
      </>)}
    </div>
  );
}

export default Cart;
