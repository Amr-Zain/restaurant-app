import HeroSection from "@/components/general/HeroSection";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/menuCard";
import FilterSidebar from "@/components/menu/Sidebar";
import { getTranslations } from "next-intl/server";
import img from "@/assets/images/login.jpg";
import PaginationControls from "@/components/general/Pagenation";
import { Filter } from "lucide-react";

const filterOptions = {
  mainCategories: ["Food", "Drink", "Dessert"],
  subCategories: {
    Food: ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Steak", "Soup"],
    Drink: ["Coffee", "Tea", "Juice", "Soda", "Water"],
    Dessert: ["Cake", "Ice Cream", "Pastry", "Cookies", "Brownie"],
  },
};

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Maxican",
  "Italian",
  "Desserts",
  "Drinks",
];
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    category?: string;
    subCategory?: string;
  }>;
}) {
  const t = await getTranslations();
  const {
    page = 1,
    category = "all",
    subCategory = "all",
  } = await searchParams;
  //requst
  return (
    <div className="space-y-12">
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
      />
      <div className="p-sec mx-auto grid w-full grid-cols-1 md:grid-cols-[230px_1fr] gap-4">
        <div className="hidden md:block">
          <FilterSidebar
            filters={filterOptions}
            category={category}
            subCategory={subCategory}
            
            />
            </div>
          <div>
            <div className="mx-8">

            <CategoryTabs
              categories={categories}
              category={category || "All"}
              className="bg-white"
            />
            </div>
            <div className="block md:hidden">
              <Filter />
            </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <MenuCard
                id="1"
                key={index}
                image={img}
                desc="Delicious food item with premium ingredients and authentic flavors"
                rating={4.5}
                price={200}
                title={`Menu Item ${index + 1}`}
                oldPrice={50}
              />
            ))}
          </div>
          <PaginationControls currentPage={+page} totalPages={8} />
        </div>
      </div>
    </div>
  );
}
