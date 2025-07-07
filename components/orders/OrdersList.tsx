import OrderReservationCard from "@/components/orders/OrderCard";
import { getTranslations } from "next-intl/server";
import PaginationControls from "@/components/general/Pagenation";
import { getOrdersReservations } from "@/services/ApiHandler";

import { FadeIn, ScaleIn } from "@/components/animations";

export default async function OrdersList({
  page,
  status,
}: {
  page: number;
  status: string;
}) {
  const t = await getTranslations();
  const res = await getOrdersReservations({
    status: status === "all" ? "" : status,
    page,
  });

  if (!res.data.length) {
    return (
      <FadeIn
        direction="none"
        duration={0.8}
        delay={0.4}
        className="text-sub my-10 text-center"
      >
        {t("noOrdersFound")}
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn
        direction="up"
        duration={0.8}
        delay={0.4}
        className="grid grid-cols-1 gap-4 gap-x-0 lg:grid-cols-2"
      >
        {res.data.map((order, i) =>
          order?.type === "reservation" ? (
            <ScaleIn
              key={`reservation ${order.id}`}
              duration={0.6}
              delay={(50 * (i % 4)) / 1000}
            >
              <OrderReservationCard
                images={[order.store?.image]}
                type={order.type}
                item_count={order.guests_number}
                id={order.id}
                desc={`${order.name || "Unknown Store"} on ${order.date} from ${order.from_time} to ${order.to_time}`}
                types={[
                  t(`TEXT.${order.type}`),
                  t(`categories.${order.status}`),
                ]}
                name={order.store.name}
              />
            </ScaleIn>
          ) : (
            <ScaleIn
              key={`order ${order.id}`}
              duration={0.6}
              delay={(50 * (i % 4)) / 1000}
            >
              <OrderReservationCard
                images={order.item.map((item) => item.product.image)}
                type={order.type}
                item_count={order.item_count}
                id={order.id}
                order_num={order.order_num}
                desc={order.item
                  .map((item) =>
                    item.sub_modifiers.map((sub) =>
                      sub.item_modifiers
                        .map(
                          (modifiers) =>
                            `${modifiers.quantity} X ${modifiers.name} ${modifiers.price ? `(${modifiers.price?.price} ${modifiers.price?.currency})` : ""}\n `,
                        )
                        .join(""),
                    ),
                  )
                  .join(", ")}
                types={[t(`TEXT.${order.type}`), order.status_trans]}
              />
            </ScaleIn>
          ),
        )}
      </FadeIn>

      <FadeIn duration={0.6} delay={0.2}>
        <PaginationControls
          currentPage={+page}
          totalPages={res.meta.last_page}
        />
      </FadeIn>
    </>
  );
}