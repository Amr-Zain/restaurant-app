import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import FavoritButton from "./FavoritButton";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Star } from "../Icons";
import { FadeIn, ScaleIn } from "../animations";

interface ProductCardProps {
  product: Product;
  isOffer?: boolean;
  index?: number; 
}

async function ProductCard({
  product,
  isOffer = false,
  index = 0,
}: ProductCardProps) {
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

  const t = await getTranslations();

  const cardBaseDelay = index * 0.05; 
  return (
    <FadeIn direction="up" delay={cardBaseDelay}>
      <Card className="mx-auto w-full gap-2 overflow-hidden p-2">
        <ScaleIn delay={cardBaseDelay + 0.1}>
          <div className="relative h-58 max-h-62 overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={name}
              fill
              className="h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <FadeIn direction="down" delay={cardBaseDelay + 0.25}>
              <div className="absolute top-2 left-2 flex items-center justify-center gap-1 rounded-full bg-white/70 px-3 py-[2px] backdrop-blur-md">
                <Star className="transition-transform duration-300 hover:rotate-12" />
                <span className="font-bold">{rating.toFixed(1)}</span>
              </div>
            </FadeIn>
          </div>
        </ScaleIn>

        <CardTitle className="text-lg">
          <div className="flex gap-2">
            <FadeIn direction="left" delay={cardBaseDelay + 0.3}>
              <Link
                href={`/menu/${slug}`}
                className="text-text text-xl"
              >
                {name}
              </Link>
            </FadeIn>
            {food_icon && (
              <FadeIn direction="right" delay={cardBaseDelay + 0.35}>
                <Image
                  src={food_icon[0]?.image}
                  width={20}
                  height={20}
                  className="object-contain"
                  alt="food icon"
                />
              </FadeIn>
            )}
          </div>
        </CardTitle>

        <FadeIn direction="left" delay={cardBaseDelay + 0.4}>
          <CardDescription className="text-sub line-clamp-2 h-10 text-sm">
            {desc}
          </CardDescription>
        </FadeIn>

        <FadeIn direction="up" delay={cardBaseDelay + 0.45}>
          <div className="flex items-center justify-between pt-2">
            {isOffer ? (
              <>
                <FadeIn direction="left" delay={cardBaseDelay + 0.5}>
                  <div className="flex flex-col">
                    <span className="text-sub line-through transition-opacity duration-300">
                      {oldPrice}
                      {priceDetails.currency}
                    </span>
                    <span className="text-text font-bold">
                      {displayPrice}
                      {priceDetails.currency}
                    </span>
                  </div>
                </FadeIn>
                {offPercentage && (
                  <ScaleIn delay={cardBaseDelay + 0.55} initialScale={0.5}>
                    <div className="bg-primary text-white flex size-12 flex-col items-center justify-center rounded-full text-[12px] font-bold">
                      <span>{t("TEXT.off")}</span>
                      <span>{offPercentage}</span>
                    </div>
                  </ScaleIn>
                )}
              </>
            ) : (
              <div className="flex w-full items-center justify-between">
                <FadeIn direction="left" delay={cardBaseDelay + 0.5}>
                  <span className="text-text font-bold">
                    {displayPrice} {priceDetails.currency}
                  </span>
                </FadeIn>
                <ScaleIn delay={cardBaseDelay + 0.55}>
                  <FavoritButton
                    isFavorit={isFavorit!}
                    favId={favourite_id}
                    id={id}
                  />
                </ScaleIn>
              </div>
            )}
          </div>
        </FadeIn>
      </Card>
    </FadeIn>
  );
}

export default ProductCard;