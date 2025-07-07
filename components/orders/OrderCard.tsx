import OverlappingImages from "../general/OverlappedImages";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { RightArrow } from "../Icons";

import { FadeIn, ScaleIn } from "@/components/animations";

async function OrderCard({
  id,
  type,
  types,
  images,
  desc,
  item_count,
  order_num,
  name,
}: {
  id: number;
  type: "reservation" | "order";
  order_num?: string;
  item_count: number;
  types: string[];
  desc: string;
  images: string[];
  name?: string;
}) {
  const t = await getTranslations();

  return (
    <Card className="order-card">
      <FadeIn
        direction="right"
        duration={0.5}
        className="flex justify-between"
      >
        <p className="text-sub flex gap-1 whitespace-nowrap">
          <span className="hidden sm:block">{t(`TEXT.${type}`)}</span> #
          {order_num || id}
        </p>
        <div className="flex gap-1">
          {types.map((type, index) => (
            <FadeIn
              key={`status ${index}`}
              direction="left"
              duration={0.4}
              delay={index * 0.1}
              className="order-status"
            >
              {type}
            </FadeIn>
          ))}
        </div>
      </FadeIn>
      <FadeIn direction="up" duration={0.6} delay={0.2}>
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
          <ScaleIn
            duration={0.5}
            delay={0.3}
            className="flex flex-row items-center justify-center gap-2 sm:flex-col"
          >
            <OverlappingImages
              images={images.slice(0,5)}
              size={50}
              overlap={50 * (0.2 * Math.min(images.length,4))}
            />
            <div className="text-sub text-sm whitespace-nowrap">
              {t(`TEXT.${type === "reservation" ? "guests" : "items"}`, {
                count: item_count,
              })}
            </div>
          </ScaleIn>
          <div className="flex w-full grow-1 justify-between gap-2">
            <FadeIn direction="left" duration={0.5} delay={0.4}>
              <p className="text-text font-semibold whitespace-nowrap">
                {t(`TEXT.${type}`)} #{order_num || name}
              </p>
              <div className="text-sub line-clamp-3 sm:h-18 overflow-hidden">{desc}</div>
            </FadeIn>
            <ScaleIn
              duration={0.4}
              delay={0.5}
              className="self-center"
            >
              <Link
                href={
                  type === "reservation" ? `/reservations/${id}` : `/orders/${id}`
                }
              >
                <Button
                  className={`!size-12 cursor-pointer self-end rtl:rotate-180`}
                >
                  <RightArrow />
                </Button>
              </Link>
            </ScaleIn>
          </div>
        </div>
      </FadeIn>
    </Card>
  );
}

export default OrderCard;