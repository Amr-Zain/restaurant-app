import HeroSection from "@/components/general/HeroSection";
import StatusTabs from "@/components/orders/StatusTabs";
import OrderCard from "@/components/orders/OrderCard";
import { getTranslations } from "next-intl/server";
import PaginationControls from "@/components/general/Pagenation";
import { getOrders } from "@/services/ApiHandler";
import ReservationCard from "@/components/reservation/ReservationCard";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; status: string }>;
}) {
  const t = await getTranslations();
  const { page = 1, status = "all" } = await searchParams;
  const res = await getOrders({ status: status === "all" ? "" : status, page });
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
                  <ReservationCard
                    key={`reservation ${i}`}
                    reservation={order as unknown as Reservation}
                  />
                ) : (
                  <OrderCard
                    key={i}
                    images={order.item.map((item) => item.product.image)}
                    item_count={order.item_count}
                    id={order.id}
                    order_num={order.order_num}
                    desc={order.item
                      .map((item) =>
                        item.sub_modifiers.map((sub) =>
                          sub.item_modifiers
                            .map(
                              (modifiers) =>
                                `${modifiers.quantity} X ${modifiers.name} ${modifiers.price ? `(${modifiers.price?.price} ${modifiers.price?.currency})` : ""}\n `
                            )
                            .join("")
                        )
                      )
                      .join(", ")}
                    types={[order.status_trans /* , order.order_type */]}
                  />
                )
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
