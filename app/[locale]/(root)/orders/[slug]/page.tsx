import OrderDetails from "@/components/orders/orderDetails";
import OrderInfo from "@/components/orders/orderDetails/OrderInfo";
const orderSummary = {
  title: "Order Summary",
  items: [
    { label: "Subtotal", value: 400 },
    { label: "Shipping Fee", value: 0 },
    { label: "Discount", value: 10 },
  ],
  totalAmount: { label: "Total", value: 410 },
};
const product: Product = {
  id: 2,
  name: "AAA",
  slug: "aaaaaab",
  desc: "This is a description for the AAA product. It's a sample item to demonstrate how the data is passed to the MenuCard component.",
  type: "regular",
  image: "https://saas.khlod.aait-d.com/storage/tenants/front_brand/images/products/2rv7dLbrAi9A5FmFMrG5SZxviCmmlFtgBQOTEDZc.jpg",
  rating: 4.5,
  review_count: 120,
  rate: 0,
  is_favourite: false,
  price: {
    price: 10,
    currency: "جنيه مصري",
    percentage: 20,
    discount_value: 2,
    price_after: 8,
  },
  favourite_id: 0
};
export default async function OrdersPage({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  console.log(slug)
  return (
    <div className="container grid gap-6 grid-cols-1 md:grid-cols-[1fr_360px] my-10">
      <OrderInfo />
      <OrderDetails  id={slug} items={[...Array(5)].map(()=>product)} orderSummary={orderSummary}/>
    </div>
  );
}
