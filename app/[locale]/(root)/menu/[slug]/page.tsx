import ItemDetails from "@/components/menuItem";
import ProductCard from "@/components/menu/ProductCard";
import SliderSection from "@/components/menu/MenuSliderSection";
import ItemReviews from "@/components/menuItem/Reviews";
import { getMenuProducts, getProfuctDeiltals } from "@/services/ApiHandler";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  try {
    product = (await getProfuctDeiltals(slug)) as ProductData;
  } catch {
    return {};
  }
  return {
    title: product.name,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      images: product.images.map((item) => item.image),
    },
  };
}

export default async function ItemDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const t = await getTranslations();
  let item: ProductData | null = null;
  try {
    item = (await getProfuctDeiltals(slug)) as ProductData;
  } catch (error: unknown) {
    console.error("Error fetching product details:", error);

    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 404
    ) {
      notFound();
    }

    console.error("An unexpected error occurred:", error);
  }

  if (!item?.id) {
    notFound();
  }
  const { data: PopularProducts } = await getMenuProducts({
    search_by: "popular",
    item_id: item.id,
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <ItemDetails productData={item} />
      <ItemReviews itemId={item.id} />
      <SliderSection
        title={t("TEXT.popularItems")}
        to="/menu"
        items={PopularProducts.map((product, index) => (
          <ProductCard key={product.id + ` ${index}`} product={product} />
        ))}
      />
    </div>
  );
}
