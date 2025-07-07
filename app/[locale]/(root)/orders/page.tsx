import { FadeIn } from "@/components/animations";
import HeroSection from "@/components/general/HeroSection";
import StatusTabs from "@/components/menu/StatusTabs";
import OrdersList from "@/components/orders/OrdersList";
import { OrdersLoading } from "@/components/skelton/SkeltonCards";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; status: string }>;
}) {
  const t = await getTranslations();
  const { page = 1, status = "all" } = await searchParams;

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
        dir={t("lang")}
      />
      <div className="p-sec mx-auto w-full">
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <StatusTabs
            categories={categories}
            className="mx-auto !w-[80%] !justify-between bg-white"
            category={status}
            status
          />
        </FadeIn>

        <Suspense key={`${status}-${page}`} fallback={<OrdersLoading />}>
          <OrdersList page={page} status={status} />
        </Suspense>
      </div>
    </div>
  );
}
