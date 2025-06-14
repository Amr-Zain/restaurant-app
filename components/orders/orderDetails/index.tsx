'use client';
import Item from "./Item";
import OrderSummary from "./OrderSummary";
/* 
booking
Cancelled
Cancel order| disabled
 */
interface OrderSummary {
    title: string;
    currency: string
    items: {
        label: string;
        value: number;
    }[];
    totalAmount: {
        label: string;
        value: number;
    }}
function OrderDetails({ id, items, orderSummary }: { id?: string, items:Product[], orderSummary:OrderSummary }) {
  
  return (
    <div className="rounded-3xl bg-white flex flex-col order-1 md:order-2">
      <div className="border-primary/20 flex items-center justify-between border-b p-4">
        <h3 className="text-text text-2xl font-semibold">{id?`Order ID - ${id}`:'Items'}</h3>
        {!!id&&<div>booking</div>}
      </div>
      <div className="mb-4 p-4 flex flex-col gap-2 justify-between grow-1">
        <div className="overflow-y-auto max-h-110 px-2">
          {items.map((item, i) => (
            <Item
              key={i}
              id={i}
              price={item.price.price}
              title={item.name}
              desc={item.desc!}
              image={item.image}
              currency={item.price.currency}
            />
          ))}
        </div>
        <OrderSummary {...orderSummary} />
      </div>
    </div>
  );
}

export default OrderDetails;
