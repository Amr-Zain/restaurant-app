"use client";
import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem";
import OrderSummary from "../orders/orderDetails/OrderSummary";
import { useTranslations } from "next-intl";
import { appStore } from "@/stores/app";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function Cart({ isCheckout }: { isCheckout?: boolean }) {
  const { items, price, currency, totalItems } = useCartStore((state) => state);
  const t = useTranslations();
  const { isPointsCovers, usePoints, points } = appStore(
    (state) => state.points,
  );
  const setPointsStatues = appStore((state) => state.setPointsStatues);
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
    <div className="mb-2 flex h-[80vh] flex-col justify-between rounded-2xl bg-white p-4">
      {!items.length ? (
        <div className="flex h-full flex-col items-center justify-center">
          <h3 className="text-text font-medium">{t("cart.noproducts")}</h3>
          <p className="text-sub">{t("cart.desc")}</p>
        </div>
      ) : (
        <>
          <div className="max-h-[55vh] overflow-y-auto px-2">
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
                isCheckout={isCheckout}
              />
            ))}
          </div>
          {!isPointsCovers && !!points && isCheckout && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="points"
                className="order-first cursor-pointer"
                checked={usePoints}
                onCheckedChange={(checked) =>
                  setPointsStatues({ usePoints: checked as boolean })
                }
              />
              <Label htmlFor="points" className="cursor-pointer">
                Use your loyalty points
              </Label>
              <div className="text-success bg-success/10 w-fit rounded-full px-4 py-2 text-sm font-semibold">
                {t("card.points", { count: points || 0 })}
              </div>
            </div>
          )}
          <OrderSummary {...orderSummary} />
        </>
      )}
    </div>
  );
}

export default Cart;
