import HeroSection from "@/components/general/HeroSection";
import MenuCard from "@/components/menu/menuCard";
import { getTranslations } from "next-intl/server";
import { getOffers } from "@/services/ApiHandler";

export default async function HomePage() {
  const t = await getTranslations();
  const offers = await getOffers();

  return (
    <div>
      <HeroSection
        title={t("NAV.offers")}
        home={t("NAV.home")}
        section={t("NAV.offers")}
        href="/offers"
      />
      {!offers.data.length ? (
        <p className="text-sub mt-8 text-center">no results</p>
      ) : (
        <div className="container my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers?.data.map((product, index) => (
            <MenuCard
              isOffer
              key={product.id + `item ${index}`}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
