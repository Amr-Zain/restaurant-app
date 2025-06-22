import OverlappingImages from "../general/OverlappedImages";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { RightArrow } from "../Icons";

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
      <div className="flex justify-between">
        <p className="text-sub flex gap-1 whitespace-nowrap">
          <span className="hidden sm:block">{t(`TEXT.${type}`)}</span> #
          {order_num || id}
        </p>
        <div className="flex gap-1">
          {types.map((type, index) => (
            <div key={index} className="order-status">
              {type}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
            <OverlappingImages
              images={images}
              size={50}
              overlap={50 * (0.2 * images.length)}
            />
            <div className="text-sub text-sm whitespace-nowrap">
              {t(`TEXT.${type === "reservation" ? "guests" : "items"}`, {
                count: item_count,
              })}
            </div>
          </div>
          <div className="flex w-full grow-1 justify-between gap-2">
            <div>
              <p className="text-text font-semibold whitespace-nowrap">
                {t(`TEXT.${type}`)} #{order_num || name}
              </p>
              <div className="text-sub line-clamp-3">{desc}</div>
            </div>
            <Link
              href={
                type === "reservation" ? `/reservations/${id}` : `/orders/${id}`
              }
            >
              <Button
                className={`!size-10 cursor-pointer self-end ${t("lang") === "rtl" ? "rotate-180" : ""}`}
              >
                <RightArrow />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
