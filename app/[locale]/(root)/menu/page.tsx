import HeroSection from "@/components/general/HeroSection";
//import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/menuCard";
import FilterSidebar from "@/components/menu/Sidebar";
import { getTranslations } from "next-intl/server";
import img from "@/assets/images/login.jpg";
import PaginationControls from "@/components/general/Pagenation";
import FilterModal from "@/components/menu/FilterModal";

const filterOptions = {
  mainCategories: ["Food", "Drink", "Dessert"],
  subCategories: {
    Food: ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Steak", "Soup"],
    Drink: ["Coffee", "Tea", "Juice", "Soda", "Water"],
    Dessert: ["Cake", "Ice Cream", "Pastry", "Cookies", "Brownie"],
  },
};
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
  return (
    <div className="space-y-12">
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
      />
      <div className="p-sec mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <div className="hidden md:block">
          <FilterSidebar
            filters={filterOptions}
            category={category}
            subCategory={subCategory}
          />
        </div>
        <div>
          
          <FilterModal category={category} subCategory={subCategory} />
          <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3">
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
