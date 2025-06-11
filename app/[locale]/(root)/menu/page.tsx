import HeroSection from "@/components/general/HeroSection";
//import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/menuCard";
import { getTranslations } from "next-intl/server";
//import PaginationControls from "@/components/general/Pagenation";
import {
  getMenuFilter,
  getMenuProducts,
} from "@/services/ApiHandler";
import FiltersLayout from "@/components/menu/FiltersLayout";
/* const product: Product = {
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
  is_favourite: true,
  price: {
    price: 10, 
    currency: "جنيه مصري",
    percentage: 20,
    discount_value: 2,
    price_after: 8, 
    offer: null,
  },
}; */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    category?: string;
    subCategory?: string;
    keyword?: string;
  }>;
}) {
  const t = await getTranslations();
  const params = await searchParams;

  const [filters, menuList] = await Promise.all([
    getMenuFilter(),
    getMenuProducts(params),
  ]);

 /*  console.log(
    await getOffers({
      lat: 31.199999999999999289457264239899814128875732421875,
      lng: 29.91799999999999926103555480949580669403076171875,
    }),
  ); */
  return (
    <div>
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
      />
      <div className="p-sec mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <FiltersLayout
          filters={filters?.content}
          category={params?.category}
          subCategory={params?.subCategory}
          keyword={params?.keyword}
        />
        <div className="flex min-h-[70vh] flex-col items-center justify-between">
          {!menuList.data.length ? (
            <p className="text-sub mt-8 text-center">no results</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {menuList?.data.map((product, index) => (
                <MenuCard key={product.id + `item ${index}`} product={product} />
              ))}
            </div>
          )}
          {/*  <PaginationControls
              currentPage={Number(params?.page)}
              totalPages={8}
            /> */}
        </div>
      </div>
    </div>
  );
}
