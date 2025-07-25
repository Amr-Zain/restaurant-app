import GeneralSection from "@/components/general/GeneralSection";
import appStore from "@/assets/images/appStore.png";
import googlePlay from "@/assets/images/googlePlay.png";
import SliderSection from "@/components/menu/MenuSliderSection";
import MenuCard from "@/components/menu/ProductCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ImagesSection from "@/components/home/ImagesSections";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HomeSlider from "@/components/home/Slider";
import ReservationForm from "@/components/reservation/ReservationForm";
import { serverCachedFetch } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/animations";
import { customFetch } from "@/helper/fetchServerOptions";

export default async function HomePage() {
  const { url, fetchOptions } = await customFetch(`home`, {
    method: "GET",
  });
  //const homeData = await getHomeData(url,fetchOptions);
  const {data:homeData} = await serverCachedFetch({
    url,
    requestHeaders: fetchOptions,
    revalidate: 3600,
  }) as {data:HomePageData};
  const t = await getTranslations();
  return (
    <div className="space-y-12">
      <HomeSlider slides={homeData?.sliders} />
      {homeData?.products && (
        <SliderSection
          title={t("TEXT.viewMenu")}
          to="/menu"
          items={homeData.products.map((product, index) => (
            <MenuCard key={product.id + ` ${index}`} product={product} />
          ))}
        />
      )}

      {homeData?.web_content && (
        <GeneralSection item={homeData.web_content} to={"/about-us"} />
      )}
      {homeData?.popular_products && (
        <SliderSection
          title={t("TEXT.popularItems")}
          to="/menu"
          items={homeData.popular_products.map((product, index) => (
            <MenuCard key={product.id + ` ${index}`} product={product} />
          ))}
        />
      )}
      <FadeIn direction="up" delay={0.1} className="mx-auto w-full sm:w-[90%]">
        <ReservationForm />
      </FadeIn>
      {homeData?.web_content_link && (
        <GeneralSection item={homeData.web_content_link} className="order-last">
          <div className="flex gap-6">
            <Link href={homeData.web_content_link.app_store}>
              <Image
                src={appStore}
                alt={"app store link"}
                width={145}
                height={42}
              />
            </Link>
            <Link href={homeData.web_content_link.google_play}>
              <Image
                src={googlePlay}
                alt={"google paly link"}
                width={145}
                height={42}
              />
            </Link>
          </div>
        </GeneralSection>
      )}
      <ImagesSection />
      {homeData?.offers && (
        <SliderSection
          title={t("TEXT.offers")}
          to="/offers"
          items={homeData.offers.map((product, index) => (
            <MenuCard
              isOffer
              key={product.id + ` ${index}`}
              product={product}
            />
          ))}
        />
      )}
      {homeData?.subscription_content && (
        <GeneralSection item={homeData.subscription_content}>
          <div className="relative">
            <Input
              type="email"
              placeholder="enter your email"
              className="h-16 rounded-full border-none bg-white shadow-none"
            />
            <Button className="absolute end-1 top-1 mb-6 font-bold">
              {t("buttons.subscribe")}
            </Button>
          </div>
        </GeneralSection>
      )}
    </div>
  );
}
