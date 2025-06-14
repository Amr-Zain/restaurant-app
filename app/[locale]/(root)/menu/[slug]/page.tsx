import ItemDetails from "@/components/menuItem";
import MenuCard from "@/components/menu/menuCard";
import SliderSection from "@/components/menu/MenuSliderSection";
import ItemReviews from "@/components/menuItem/Reviews";
import { getProfuctDeiltals } from "@/services/ApiHandler";
const product: Product = {
  id: 29,
  name: "AAA",
  slug: "aaaaaab",
  desc: "This is a description for the AAA product. It's a sample item to demonstrate how the data is passed to the MenuCard component.",
  type: "regular",
  image:
    "https://saas.khlod.aait-d.com/storage/tenants/front_brand/images/products/2rv7dLbrAi9A5FmFMrG5SZxviCmmlFtgBQOTEDZc.jpg",
  rating: 4.5,
  review_count: 120,
  rate: 0,
  favourite_id:11,
  is_favourite: true,
  price: {
    price: 10,
    currency: "جنيه مصري",
    percentage: 20,
    discount_value: 2,
    price_after: 8,
  },
};
export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const item = (await getProfuctDeiltals(slug)) as ProductData;
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <ItemDetails productData={item} />
      <ItemReviews itemId={item.id} />

      <SliderSection
        title="Popular Items"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard key={product.id + ` ${index}`} product={product} />
        ))}
      />
    </div>
  );
}
