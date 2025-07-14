import ItemDetails from "@/components/menuItem";
import ProductCard from "@/components/menu/ProductCard";
import SliderSection from "@/components/menu/MenuSliderSection";
import ItemReviews from "@/components/menuItem/Reviews";
import {
  getMenuProducts,
  serverCachedFetch,
} from "@/services/ApiHandler";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { customFetch } from "@/helper/fetchServerOptions";

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations();
  let item: ProductData | null = null;
  try {
    //item = (await getProductDeiltals(slug)) as ProductData;
    const { url, fetchOptions } = await customFetch(`product/${slug}`, {
      method: "GET",
    });
    const {data} = await serverCachedFetch({
      url,
      requestHeaders: fetchOptions,
      revalidate: 3600,
    });
    item = data
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { url, fetchOptions } = await customFetch(`product/${slug}`, {
      method: "GET",
    });
    const { url: settingUrl } = await customFetch("/web_settings");
    const title = (
      await serverCachedFetch({
        url: settingUrl,
        requestHeaders: fetchOptions,
        revalidate: 3600,
      })
    ).data.website_setting.website_title;
    const {data:product} = await serverCachedFetch({
      url,
      requestHeaders: fetchOptions,
      revalidate: 3600,
    }) as {data:ProductData};
    //const title = (await getSettingsData()).website_setting.website_title;
    return {
      title: `${product.name} - ${title}`,
      description: product.seo.description,
      keywords: product.seo.keywords,
      openGraph: {
        images: product.images.map((item) => item.image),
      },
    };
  } catch {
    return {};
  }
}
