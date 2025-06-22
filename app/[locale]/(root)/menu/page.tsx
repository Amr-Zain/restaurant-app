import HeroSection from "@/components/general/HeroSection";
//import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/ProductCard";
import { getTranslations } from "next-intl/server";
//import PaginationControls from "@/components/general/Pagenation";
import { getMenuFilter, getMenuProducts } from "@/services/ApiHandler";
import FiltersLayout from "@/components/menu/FiltersLayout";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    categories?: string;
    sub_categories?: string;
    keyword?: string;
  }>;
}) {
  const t = await getTranslations();
  const params = await searchParams;
  console.log(params)
  const [filters, menuList] = await Promise.all([
    getMenuFilter(),
    getMenuProducts(params),
  ]);
  console.log(menuList)
  return (
    <div>
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
        dir={t('lang')}
      />
      <div className="p-sec mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <FiltersLayout
          filters={filters?.content}
          initialCategoryIds={params?.categories?.split(',')}
          initialSubCategoryIds={params?.sub_categories?.split(',')}
          keyword={params?.keyword}
        />
        <div className="flex min-h-[70vh] flex-col items-center justify-between">
          {!menuList.data.length ? (
            <p className="text-sub mt-8 text-center">{t("TEXT.noResults")}</p>

          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menuList?.data.map((product, index) => (
                  <MenuCard
                    key={product.id + `item ${index}`}
                    product={product}
                  />
                ))}
              </div>
              {/*  <PaginationControls
              currentPage={Number(params?.page)}
              totalPages={8}
            /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
