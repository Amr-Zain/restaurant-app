import ItemDetails from "@/components/menu/itemDitals";
import MenuCard from "@/components/menu/menuCard";
import SliderSection from "@/components/menu/MenuSliderSection";
import img from "@/assets/images/login.jpg";

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <ItemDetails />
      <SliderSection
        title="Popular Items"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard
            id="1"
            key={index}
            image={img}
            desc="Delicious food item with premium ingredients and authentic flavors"
            rating={4.5}
            price={200}
            title={`Menu Item ${index + 1}`}
          />
        ))}
      />
    </div>
  );
}
