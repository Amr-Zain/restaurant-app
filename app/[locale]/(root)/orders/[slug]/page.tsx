import OrderDetails from "@/components/orders/orderDetails";

export default async function OrdersPage({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  console.log(slug)
  return (
    <div className="space-y-12 ">
      <OrderDetails  id={slug}/>
    </div>
  );
}
