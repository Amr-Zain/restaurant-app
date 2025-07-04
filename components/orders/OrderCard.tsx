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
      <div 
        className="flex justify-between"
        data-aos="fade-right"
        data-aos-duration="500"
      >
        <p className="text-sub flex gap-1 whitespace-nowrap">
          <span className="hidden sm:block">{t(`TEXT.${type}`)}</span> #
          {order_num || id}
        </p>
        <div className="flex gap-1">
          {types.map((type, index) => (
            <div 
              key={`status ${index}`} 
              className="order-status"
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-delay={index * 100}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
          <div 
            className="flex flex-row items-center justify-center gap-2 sm:flex-col"
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-delay="300"
          >
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
            <div data-aos="fade-left" data-aos-duration="500" data-aos-delay="400">
              <p className="text-text font-semibold whitespace-nowrap">
                {t(`TEXT.${type}`)} #{order_num || name}
              </p>
              <div className="text-sub line-clamp-3 sm:h-20">{desc}</div>
            </div>
            <div 
              data-aos="zoom-in" 
              data-aos-duration="400" 
              data-aos-delay="500"
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
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;