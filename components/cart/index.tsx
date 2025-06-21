"use client";
import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem";
import OrderSummary from "../orders/orderDetails/OrderSummary";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

function Cart() {
  const { items, price, currency, totalItems } = useCartStore((state) => state);
  const t = useTranslations();

  const orderSummary = {
    title: t("orderSummary.title"),
    currency: currency,
    items: [
      {
        label: (
          <>
            {t("orderSummary.subtotal")}
            <span className="text-sub ms-2 text-sm font-semibold">
              ({t("cart.items", { count: totalItems })})
            </span>
          </>
        ),
        value: price?.sun_total || 0,
      },
      {
        label: `${t("orderSummary.shipping")} ${price?.delivery_price === 0 ? t("orderSummary.fee") : ""}`,
        value: price?.delivery_price || 0,
      },
      { label: t("orderSummary.surcharge"), value: price?.surcharge || 0 },
      { label: t("orderSummary.tax"), value: price?.tax_rate_value || 0 },
    ],
    totalAmount: { label: t("orderSummary.total"), value: price?.total || 0 },
  };

  return (
    <div className="mb-4 flex h-[90vh] flex-col justify-between px-4">
      {!items.length ? (
        <div className="flex h-full flex-col items-center justify-center">
          <h3 className="text-text font-medium">{t("cart.noproducts")}</h3>
          <p className="text-sub">{t("cart.desc")}</p>
        </div>
      ) : (
        <>
          <div className="max-h-[50vh] overflow-y-auto px-2">
            {items.map((item, i) => (
              <CartItem
                id={item.product.id}
                slug={item.product.slug}
                cart_product_id={item.id}
                title={item.product.name}
                quantity={item.quantity}
                sub_modifiers={item.sub_modifiers}
                image={item.product.image}
                price={item.total_price}
                key={`Item ${item.product.slug + i}`}
              />
            ))}
          </div>
          <div>
            <OrderSummary {...orderSummary} />
            <Link href={"/checkout"}>
              <Button variant={"default"} className="my-2 !h-12 !w-full">
                {t("cart.checkoutButton")}
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
