import OrderDetails from "@/components/orders/orderDetails";
import OrderInfo from "@/components/orders/orderDetails/OrderInfo";
import { getOrder } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { FadeIn } from "@/components/animations";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let res = null;
  try {
    res = await getOrder(slug);
  } catch (error: unknown) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.status === 404) return notFound();
    throw error instanceof Error ? error.message : 'error loading the data'
  }
  const t = await getTranslations();
  const orderSummary = {
    title: t("orderSummary.title"),
    currency: res.data.price_detail.currency,
    items: [
      {
        label: (
          <>
            {t("orderSummary.subtotal")}
            <span className="text-sub ms-2 text-sm">
              (
              {t("cart.items", {
                count: res.data.item.reduce(
                  (prv, item) => item.quantity + prv,
                  0,
                ),
              })}
              )
            </span>
          </>
        ),
        value: res.data.price_detail.total_item_price_before_discount || 0,
      },
      {
        label: t("orderSummary.surcharge"),
        value: res.data.price_detail.surcharge_value || 0,
      },
      {
        label: t("orderSummary.tax"),
        value: res.data.price_detail.tax_rate_value || 0,
      },
    ],
    totalAmount: {
      label: t("orderSummary.total"),
      value: res.data.price_detail.total_price || 0,
    },
  };
  return (
    <FadeIn
      direction="up"
      duration={0.8}
      className="container my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]"
    >
      <FadeIn
        direction="right"
        duration={0.7}
        delay={0.2}
      >
        <OrderInfo
          id={res.data.id}
          callCenter={res.data.call_center}
          callCenterMessage={res.data.call_center_message}
          orderDate={res.data.order_date}
          orderTime={res.data.order_time}
          address={res.data.address}
          orderStatus={res.data.order_status!}
        />
      </FadeIn>
      <FadeIn
        direction="left"
        duration={0.7}
        delay={0.4}
      >
        <OrderDetails
          canCancel={res.data.can_cancel}
          orderNumber={res.data.order_num}
          id={slug}
          statusTrans={res.data.status_trans}
          status={res.data.status}
          items={res.data.item}
          orderSummary={orderSummary}
        />
      </FadeIn>
    </FadeIn>
  );
}