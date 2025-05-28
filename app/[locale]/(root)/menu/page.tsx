import HeroSection from "@/components/general/HeroSection";
import FilterSidebar from "@/components/menu/Sidebar";
import { getTranslations } from "next-intl/server";

export const filterOptions = {
  mainCategories: ["Food", "Drink", "Dessert"], 
  subCategories: { 
    Food: ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Steak", "Soup"],
    Drink: ["Coffee", "Tea", "Juice", "Soda", "Water"],
    Dessert: ["Cake", "Ice Cream", "Pastry", "Cookies", "Brownie"],
  },
};
export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div className="space-y-12">
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
      />
      <div className="mx-auto w-full sm:w-[90%]">
        <FilterSidebar filters={filterOptions} />
      </div>
    </div>
  );
}
