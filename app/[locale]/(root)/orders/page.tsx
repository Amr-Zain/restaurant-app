import HeroSection from "@/components/general/HeroSection";
import StatusTabs from "@/components/menu/StatusTabs";
import OrderReservationCard from "@/components/orders/OrderCard";
import { getTranslations } from "next-intl/server";
import PaginationControls from "@/components/general/Pagenation";
import { getOrdersReservations } from "@/services/ApiHandler";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; status: string }>;
}) {
  const t = await getTranslations();
  const { page = 1, status = "all" } = await searchParams;
  const res = await getOrdersReservations({
    status: status === "all" ? "" : status,
    page,
  });
  console.log(res);

  const categories = [
    t("categories.all"),
    t("categories.pending"),
    t("categories.completed"),
    t("categories.cancelled"),
  ];

  return (
    <div className="space-y-12">
      <HeroSection
        title={t("NAV.orders")}
        home={t("NAV.home")}
        section={t("NAV.orders")}
        href="/orders"
        dir={t('lang')}
      />
      <div className="p-sec mx-auto w-full">
        <StatusTabs
          categories={categories}
          className="mx-auto !w-[80%] !justify-between bg-white"
          category={status}
          status
        />
        {res.data.length ? (
          <>
            <div className="grid grid-cols-1 gap-4 gap-x-0 lg:grid-cols-2">
              {res.data.map((order, i) =>
                order?.type === "reservation" ? (
                  <OrderReservationCard
                    key={i}
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
                ) : (
                  <OrderReservationCard
                    key={i}
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
                ),
              )}
            </div>
            <PaginationControls
              currentPage={+page}
              totalPages={res.meta.last_page}
            />
          </>
        ) : (
          <div className="text-sub my-10 text-center">{t("noOrdersFound")}</div>
        )}
      </div>
    </div>
  );
}
