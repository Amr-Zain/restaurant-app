import HeroSection from "@/components/general/HeroSection";
import MenuCard from "@/components/menu/ProductCard";
import { getTranslations } from "next-intl/server";
import {
  serverCachedFetch,
} from "@/services/ApiHandler";
import FiltersLayout from "@/components/menu/FiltersLayout";

import { FadeIn } from "@/components/animations";
import { Metadata } from "next";
import { customFetch } from "@/helper/fetchServerOptions";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t("NAV.menu"),
    };
}
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
  const { url: productUrl, fetchOptions: ProductOptions } = await customFetch(
    "product",
    { method: "GET" },
    params as Record<string, string>,
  );
  const { url, fetchOptions } = await customFetch(`get-filter`, {
    method: "GET",
    headers: { os: "" },
  });
  const [{ data: filters }, menuList] = await Promise.all([
    serverCachedFetch({
      url,
      requestHeaders: fetchOptions,
      revalidate: 3600,
    }),
    serverCachedFetch({
      url: productUrl,
      requestHeaders: ProductOptions,
      revalidate: 3600,
    }) as Promise<{data:Product[]}>,
  ]);

  const lang = t("lang");

  const filtersLayoutDirection = lang === "ltr" ? "left" : "right";

  return (
    <div>
      <HeroSection
        title={t("NAV.menu")}
        home={t("NAV.home")}
        section={t("NAV.menu")}
        href="/menu"
        dir={lang}
      />
      <div className="p-sec mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <FadeIn direction={filtersLayoutDirection} delay={0.2} duration={0.7}>
          <FiltersLayout
            filters={filters?.content}
            initialCategoryIds={params?.categories?.split(",")}
            initialSubCategoryIds={params?.sub_categories?.split(",")}
            keyword={params?.keyword}
          />
        </FadeIn>
        <div className="flex min-h-[70vh] flex-col items-center justify-between">
          {!menuList.data.length ? (
            <FadeIn direction="up" delay={0.3} duration={0.6}>
              <p className="text-sub mt-8 text-center">{t("TEXT.noResults")}</p>
            </FadeIn>
          ) : (
            <>
              <FadeIn direction="up" delay={0.3} duration={0.8}>
                <div className="container my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {menuList?.data.map((product, index) => (
                    <MenuCard
                      key={product.id + `item ${index}`}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </FadeIn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
