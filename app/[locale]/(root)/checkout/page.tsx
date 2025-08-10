import CheckOutForm from "@/components/checkout/CheckOutForm";
import {
  getCartServer,
  //getSettingsData,
} from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import Cart from "@/components/cart";

import { FadeIn } from "@/components/animations";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  try {
    const t = await getTranslations();
    return {
      title: t("checkout.title"),
    };
  } catch {
    return {};
  }
}

async function CheckOut({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const cart = await getCartServer();
  const t = await getTranslations();
  const params = await searchParams;

  const lang = t("lang");

  const formDirection = lang === "rtl" ? "left" : "right";
  const cartDirection = lang === "rtl" ? "right" : "left";

  return (
    <div>
      {cart?.data?.products ? (
        <FadeIn direction="up" delay={0.1} duration={0.8}>
          <div className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_380px]">
            <FadeIn direction={formDirection} delay={0.3} duration={0.7}>
              <CheckOutForm params={params} />
            </FadeIn>
            <FadeIn direction={cartDirection} delay={0.4} duration={0.7}>
              <Cart isCheckout />
            </FadeIn>
          </div>
        </FadeIn>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <h3 className="text-text font-medium">{t("cart.noproducts")}</h3>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <p className="text-sub">{t("cart.desc")}</p>
          </FadeIn>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
