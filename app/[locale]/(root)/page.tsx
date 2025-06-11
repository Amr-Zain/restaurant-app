import GeneralSection from "@/components/general/GeneralSection";
import appStore from "@/assets/images/appStore.png";
import googlePlay from "@/assets/images/googlePlay.png";
import SliderSection from "@/components/menu/MenuSliderSection";
import MenuCard from "@/components/menu/menuCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ImagesSection from "@/components/home/ImagesSections";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HomeSlider from "@/components/home/Slider";
import ReservationForm from "@/components/reservation/ReservationForm";
import { getHomeData } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
const product: Product = {
  id: 2,
  name: "AAA",
  slug: "aaaaaab",
  desc: "This is a description for the AAA product. It's a sample item to demonstrate how the data is passed to the MenuCard component.",
  type: "regular",
  image:
    "https://saas.khlod.aait-d.com/storage/tenants/front_brand/images/products/2rv7dLbrAi9A5FmFMrG5SZxviCmmlFtgBQOTEDZc.jpg",
  rating: 4.5,
  review_count: 120,
  rate: 0,
  is_favourite: false,
  price: {
    price: 10,
    currency: "جنيه مصري",
    percentage: 20,
    discount_value: 2,
    price_after: 8,
    offer: null,
  },
};
export default async function HomePage() {
  const homeData = await getHomeData();
  const t = await getTranslations();
  return (
    <div className="space-y-12">
      <HomeSlider slides={homeData?.sliders} />
      <SliderSection
        title={"View Our Menus"}
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard key={product.id + ` ${index}`} product={product} />
        ))}
      />

      {homeData?.web_content && (
        <GeneralSection item={homeData.web_content} to={"/about-us"} />
      )}
      <SliderSection
        title="Popular Items"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard key={product.id + ` ${index}`} product={product} />
        ))}
      />
      <div className="mx-auto w-full sm:w-[90%]">
        <ReservationForm />
      </div>
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
      <SliderSection
        title="Offers"
        to="/menu"
        items={[...Array(9)].map((_, index) => (
          <MenuCard isOffer key={product.id + ` ${index}`} product={product} />
        ))}
      />
      {homeData?.subscription_content && (
        <GeneralSection item={homeData.subscription_content} className="mb-8">
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
