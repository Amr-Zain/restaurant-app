import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import FavoritButton from "./FavoritButton";
import { Link } from "@/i18n/routing";

interface MenuCardProps {
  product: Product;
  isOffer?: boolean;
  index?: number;
}

function MenuCard({ product, isOffer = false, index = 0 }: MenuCardProps) {
  const {
    id,
    favourite_id,
    image,
    name,
    desc,
    rating,
    is_favourite: isFavorit,
    price: priceDetails,
    slug,
    food_icon,
  } = product;

  const displayPrice = priceDetails.price_after;
  const oldPrice = priceDetails.price;
  const offPercentage = isOffer
    ? `${priceDetails.percentage!.toFixed(0)}%`
    : undefined;

  const baseDelay = index * 100;

  return (
    <Card
      className="mx-auto max-w-[380px] gap-2 overflow-hidden p-2"
      data-aos="fade-up"
      data-aos-delay={baseDelay}
      data-aos-duration="800"
      data-aos-easing="ease-out-cubic"
      data-aos-once="true"
    >
      <div
        className="relative h-58 max-h-62 overflow-hidden rounded-xl"
        data-aos="zoom-in"
        data-aos-delay={baseDelay + 200}
        data-aos-duration="600"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div
          className="absolute top-2 left-2 flex items-center justify-center gap-2 rounded-full bg-white/70 px-4 py-[2px] backdrop-blur-md"
          data-aos="fade-down"
          data-aos-delay={baseDelay + 400}
          data-aos-duration="500"
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:rotate-12"
          >
            <path
              d="M10.2873 0.671975L12.2998 4.88166C12.3873 5.13424 12.6498 5.30263 12.9123 5.38682L17.4623 6.06037C18.2498 6.06037 18.5123 6.90231 17.9873 7.40747L14.6623 10.691C14.4873 10.8594 14.3998 11.1962 14.3998 11.4488L15.1873 15.9952C15.2748 16.6688 14.5748 17.2581 13.9623 16.9214L9.84983 14.7323C9.58733 14.5639 9.32483 14.5639 9.06233 14.7323L4.94983 16.9214C4.33733 17.2581 3.54983 16.753 3.72483 15.9952L4.51233 11.4488C4.59983 11.1962 4.42483 10.8594 4.24983 10.691L0.924826 7.40747C0.487326 6.90231 0.749826 6.06037 1.44983 5.97618L5.99983 5.30263C6.26233 5.30263 6.52483 5.05005 6.61233 4.79747L8.62483 0.587781C9.06233 -0.00157483 9.93733 -0.00157492 10.2873 0.671975Z"
              fill="#F6C100"
            />
          </svg>
          <span className="font-bold">{rating}</span>
        </div>
      </div>

      <CardTitle className="text-lg">
        <div className="flex gap-2">
          <Link
            href={`/menu/${slug}`}
            className="text-text text-xl"
            data-aos="fade-right"
            data-wow-duration="1.3s"
            data-wow-delay="0s"
          >
            {name}
          </Link>
          {food_icon&&<Image
            src={food_icon[0]?.image}
            data-aos="fade-left"
            data-wow-duration="1.3s"
            data-wow-delay="0s"
            width={20}
            height={20}
            className="object-contain"
            alt="food icon"
          />}
        </div>
      </CardTitle>

      <CardDescription
        className="line-clamp-2 text-sm"
        data-aos="fade-right"
        data-aos-delay={baseDelay + 350}
        data-aos-duration="600"
      >
        {desc}
      </CardDescription>

      <div
        className="flex items-center justify-between pt-2"
        data-aos="fade-up"
        data-aos-delay={baseDelay + 400}
        data-aos-duration="600"
      >
        {isOffer ? (
          <>
            <div
              className="flex flex-col gap-1"
              data-aos="slide-right"
              data-aos-delay={baseDelay + 450}
            >
              <span className="text-sub line-through transition-opacity duration-300">
                {oldPrice}
                {priceDetails.currency}
              </span>
              <span className="text-text font-bold">
                {displayPrice}
                {priceDetails.currency}
              </span>
            </div>
            {offPercentage && (
              <div
                className="bg-primary text-backgroud flex size-12 flex-col items-center justify-center rounded-full text-[12px] font-bold"
                data-aos="flip-left"
                data-aos-delay={baseDelay + 500}
                data-aos-duration="800"
              >
                <span>off</span>
                <span>{offPercentage}</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <span
              className="text-text font-bold"
              data-aos="slide-right"
              data-aos-delay={baseDelay + 450}
            >
              {displayPrice}{" "}
              {priceDetails.currency}
            </span>
            <div
              data-aos="zoom-in"
              data-aos-delay={baseDelay + 500}
              data-aos-duration="500"
            >
              <FavoritButton
                isFavorit={isFavorit!}
                favId={favourite_id}
                id={id}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default MenuCard;
