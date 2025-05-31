import HeroSection from "@/components/general/HeroSection";
import CategoryTabs from "@/components/menu/CategoryTabs";
import OrderCard from "@/components/orders/OrderCard";
import { getTranslations } from "next-intl/server";
import img from "@/assets/images/login.jpg";
import PaginationControls from "@/components/general/Pagenation";

const categories = ["Progress", "schedule", "Completed", "Cancelled"];
export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ page: number, category: string }>}) {
  const t = await getTranslations();
  const { page = 1, category = 'In Progress' }= await searchParams;
  return (
    <div className="space-y-12 ">
      <HeroSection
        title={t("NAV.orders")}
        home={t("NAV.home")}
        section={t("NAV.orders")}
        href="/orders"
      />
      <div className="mx-auto w-full p-sec">
        <CategoryTabs
          categories={categories}
          className="mx-auto !w-[80%] !justify-between bg-white"
          category={category}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-x-0">
          {[...Array(10)].map((_, i) => (
            <OrderCard
              key={i}
              images={[img, img, img]}
              id="dsdsfdsffsddfs"
              desc="Pickled carrots + celery, tomatoes, cilantro, blue cheese, za’atar "
              types={[category, "Takeaway "]}
            />
          ))}
        </div>
          <PaginationControls currentPage={+page} totalPages={8} />
      </div>
    </div>
  );
}
