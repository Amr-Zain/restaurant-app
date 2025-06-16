import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem";
import OrderSummary from "../orders/orderDetails/OrderSummary";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";

function Cart() {
  const { items, price, currency } = useCartStore((state) => state);

  const orderSummary = {
    title: "Order Summary",
    currency: currency,
    items: [
      { label: "Subtotal", value: price?.sun_total || 0 },
      {
        label: `Shipping ${price?.delivery_price === 0 ? "Fee" : ""}`,
        value: price?.delivery_price || 0,
      },
      { label: "Surcharge", value: price?.surcharge || 0 },
      { label: "Tax", value: price?.tax_rate_value || 0 },
      /* { label: "Discount", value: price?.delivery_price || 0 }, */
    ],
    totalAmount: { label: "Total", value: price?.total || 0 },
  };
  return (
    <div className="mb-4 flex flex-col justify-between overflow-y-auto px-4">
      {!items.length ? (
        <div className="flex h-full flex-col items-center justify-center">
          <h3 className="text-text font-medium">No products</h3>
          <p className="text-sub">
            {"You don't have any products yet in your cart"}
          </p>
        </div>
      ) : (
        <>
          <div className="px-2">
            {items.map((item, i) => (
              <CartItem
                id={item.product.id}
                slug={item.product.slug}
                cart_product_id={item.id}
                title={item.product.name}
                quantity={item.quantity}
                sub_modifiers={item.sub_modifiers}
                image={item.product.image}
                price={item.total_price}
                key={`Item ${item.product.slug + i}`}
              />
            ))}
          </div>
          <OrderSummary {...orderSummary} />
          <Link href={"/checkout"}>
            <Button variant={"default"} className="my-2 !h-12 !w-full">
              Checkout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
