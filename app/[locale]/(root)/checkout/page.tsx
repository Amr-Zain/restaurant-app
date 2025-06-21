import CheckOutForm from "@/components/checkout/CheckOutForm";
import OrderDetails from "@/components/orders/orderDetails";
import { getCartServer } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
async function CheckOut() {
  const cart = await getCartServer();
  const t = await getTranslations();

  const orderSummary = {
    title: t("orderSummary.title"),
    currency: cart?.currency,
    items: [
      {
        label: (
          <>
            {t("orderSummary.subtotal")}
            <span className="text-sub ms-2 text-sm">
              ({t("cart.items", { count: cart?.data?.item_count || 0 })})
            </span>
          </>
        ),
        value: cart?.price?.sun_total || 0,
      },
      {
        label: t("orderSummary.surcharge"),
        value: cart?.price?.surcharge || 0,
      },
      { label: t("orderSummary.tax"), value: cart?.price?.tax_rate_value || 0 },
    ],
    totalAmount: {
      label: t("orderSummary.total"),
      value: cart?.price?.total || 0,
    },
  };

  return (
    <div>
      {cart?.data?.products ? (
        <div className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_400px]">
          <CheckOutForm />
          <OrderDetails
            items={cart.data.products as unknown as Item[]}
            orderSummary={orderSummary}
          />
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
