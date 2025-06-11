import OrderDetails from "@/components/orders/orderDetails";
import OrderInfo from "@/components/orders/orderDetails/OrderInfo";

export default async function OrdersPage({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  console.log(slug)
  return (
    <div className="container grid gap-6 grid-cols-[1fr_400px] my-10">
      <OrderInfo />
      <OrderDetails  id={slug}/>
    </div>
  );
}
