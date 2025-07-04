import CheckOutForm from "@/components/checkout/CheckOutForm";
import { getCartServer } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import Cart from "@/components/cart";

async function CheckOut({ searchParams }:{searchParams:Promise<Record<string, string>>}) {
  const cart = await getCartServer();
  const t = await getTranslations();
  const params = await searchParams;
  return (
    <div>
      {cart?.data?.products ? (
        <div className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_380px]">
          <CheckOutForm params={params} />
          <Cart isCheckout />
        </div>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <h3 className="text-text font-medium">{t("cart.noproducts")}</h3>
          <p className="text-sub">{t("cart.desc")}</p>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
