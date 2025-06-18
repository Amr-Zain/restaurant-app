"use client";
import Item from "./Item";
import OrderSummary from "./OrderSummary";
import CancelOrder from "../CancelOrderModal";
/* 
booking
Cancelled
Cancel order| disabled
 */
interface OrderSummary {
  title: string;
  currency: string;
  items: {
    label: string;
    value: number;
  }[];
  totalAmount: {
    label: string;
    value: number;
  };
}
function OrderDetails({
  id,
  items,
  orderSummary,
  canCancel,
  status,
}: {
  id: string;
  status?: string;
  items: Item[];
  canCancel: boolean;
  orderSummary: OrderSummary;
}) {
  console.log(items);
  return (
    <div className="order-1 flex flex-col rounded-3xl bg-white md:order-2">
      <div className="border-primary/20 flex items-center justify-between border-b p-4">
        <h3 className="text-text text-2xl font-semibold">
          {id ? `Order ID - ${id}` : "Items"}
        </h3>
        {status && (
          <CancelOrder canCancel={canCancel} id={id} status={status} />
        )}
      </div>
      <div className="mb-4 flex grow-1 flex-col justify-between gap-2 p-4">
        <div className="max-h-110 overflow-y-auto px-2">
          {items.map((item, i) => (
            <Item
              key={i}
              id={i}
              price={item.total_price}
              title={item.product.name}
              desc={item.sub_modifiers?.map((sub) => sub.name).join(", ")}
              image={item.product.image}
              currency={item.product.price.currency}
            />
          ))}
        </div>
        <OrderSummary {...orderSummary} />
      </div>
    </div>
  );
}

export default OrderDetails;
