import OrderItem from "./Item";
import img from "@/assets/images/imgeSection/1.jpg";
import OrderSummary from "./OrderSummary";
/* 
booking
Cancelled
Cancel order| disabled
 */
function OrderDetails({ id }: { id: string }) {
  const orderSummary = {
    title: "Order Summary",
    items: [
      { label: "Subtotal", value: 400 },
      { label: "Shipping Fee", value: 0 },
      { label: "Discount", value: 10 },
    ],
    totalAmount: { label: "Total", value: 410 },
  };
  return (
    <div className="mr-4 ml-auto w-106 rounded-3xl bg-white">
      <div className="border-primary/20 flex items-center justify-between border-b p-4">
        <h3 className="text-text text-2xl font-semibold">Order ID - {id}</h3>
        <div>booking</div>
      </div>
      <div className="mb-4 p-4">
        <div>
          {[...Array(4)].map((_, i) => (
            <OrderItem
              key={i}
              id={i}
              price={400}
              title="dfssdf"
              desc="dfssdf dfssdf dfssdf"
              image={img}
              currency="EGP"
            />
          ))}
        </div>
        <OrderSummary {...orderSummary} />
      </div>
    </div>
  );
}

export default OrderDetails;
