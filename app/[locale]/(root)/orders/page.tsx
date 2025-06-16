import HeroSection from "@/components/general/HeroSection";
import CategoryTabs from "@/components/menu/CategoryTabs";
import OrderCard from "@/components/orders/OrderCard";
import { getTranslations } from "next-intl/server";
import PaginationControls from "@/components/general/Pagenation";
import { getOrders } from "@/services/ApiHandler";
import ReservationCard from "@/components/reservation/ReservationCard";

const categories = ["All", "Pending", "Completed", "Cancelled", "Schedule"];
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; status: string }>;
}) {
  const t = await getTranslations();
  const { page = 1, status = "all" } = await searchParams;
  const res = await getOrders({ status:status ==='all'?"":status, page });
  console.log(res);
  return (
    <div className="space-y-12">
      <HeroSection
        title={t("NAV.orders")}
        home={t("NAV.home")}
        section={t("NAV.orders")}
        href="/orders"
      />
      <div className="p-sec mx-auto w-full">
        <CategoryTabs
          categories={categories}
          className="mx-auto !w-[80%] !justify-between bg-white"
          category={status}
          status
        />
        <div className="grid grid-cols-1 gap-4 gap-x-0 lg:grid-cols-2">
          {res.data.length ? (
            <>
              {res.data.map((order, i) => (
                order?.type ==="reservation"?<ReservationCard key={`reservation ${i}`} reservation={order as unknown as Reservation} />:
                <OrderCard
                  key={i}
                  images={order.item.map((item) => item.product.image)}
                  item_count={order.item_count}
                  id={order.id}
                  order_num={order.order_num}
                  desc={order.item
                    .map((item) => item.sub_modifiers.map((sub) => sub.name))
                    .join(" - ")}
                  types={[order.status_trans /* , order.order_type */]}
                />
              ))}
              <PaginationControls
                currentPage={+page}
                totalPages={res.meta.last_page}
              />
            </>
          ) : (
            <div className="text-sub text-center my-10">No Orders Found</div>
          )}
        </div>
      </div>
    </div>
  );
}



