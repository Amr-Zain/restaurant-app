import HeroSection from "@/components/general/HeroSection";
import ProductCard from "@/components/menu/ProductCard";
import { getTranslations } from "next-intl/server";
import { serverCachedFetch } from "@/services/ApiHandler";
import PaginationControls from "@/components/general/Pagenation";
import { FadeIn } from "@/components/animations";
import { Metadata } from "next";
import { customFetch } from "@/helper/fetchServerOptions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("TEXT.offers"),
  };
}
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
  }>;
}) {
  const t = await getTranslations();
  const params = await searchParams;
  //const offers = await getOffers(params);
  const { url, fetchOptions: ProductOptions } = await customFetch(
    "offers",
    { method: "GET" },
    params as Record<string, string>,
  );
  const offers = (await serverCachedFetch({
    url,
    requestHeaders: ProductOptions,
    revalidate: 3600,
  })) as { data: Product[]; meta: Meta; links: Links };
  return (
    <div>
      <HeroSection
        title={t("NAV.offers")}
        home={t("NAV.home")}
        section={t("NAV.offers")}
        href="/offers"
        dir={t("lang")}
      />
      {!offers.data.length ? (
        <p className="text-sub mt-8 text-center">{t("TEXT.noResults")}</p>
      ) : (
        <FadeIn direction="up" delay={0.3} duration={0.8}>
          <div className="container my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers?.data.map((product, index) => (
              <ProductCard
                isOffer
                key={product.id + `item ${index}`}
                product={product}
              />
            ))}
          </div>
          <PaginationControls
            currentPage={Number(params?.page) || offers.meta.current_page}
            totalPages={offers.meta.last_page}
          />
        </FadeIn>
      )}
    </div>
  );
}
