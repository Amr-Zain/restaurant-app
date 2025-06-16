import OrderDetails from "@/components/orders/orderDetails";
import OrderInfo from "@/components/orders/orderDetails/OrderInfo";
import { getOrder } from "@/services/ApiHandler";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getOrder(slug);
  console.log(res);
  const orderSummary = {
    title: "Order Summary",
    currency: res.data.price_detail.currency,
    items: [
      {
        label: "Subtotal",
        value: res.data. price_detail.total_item_price_before_discount,
      },
      { label: "surcharge", value: res.data.price_detail.surcharge_value },
      { label: "tax", value: res.data.price_detail.tax_rate_value },
      { label: "Discount", value: res.data.price_detail.discount_value },
    ],
    totalAmount: { label: "Total", value: res.data.price_detail.total_price },
  };
  return (
    <div className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
      <OrderInfo
        callCenter={res.data.call_center}
        callCenterMessage={res.data.call_center_message}
        orderDate={res.data.order_date}
        orderTime={res.data.order_time}
        address={res.data.address}
        orderStatus ={res.data.order_status!}
        />
      <OrderDetails
        canCancel={res.data.can_cancel}
        id={slug}
        status={res.data.status}
        items={res.data.item}
        orderSummary={orderSummary}
      />
    </div>
  );
}
