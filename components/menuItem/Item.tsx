import { Share2 } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import ReviewStars from "./ReviewStars";
import FavoritButton from "../menu/FavoritButton";
import { Textarea } from "@/components/ui/textarea";
import { getTranslations } from "next-intl/server";

async function Item({
  review_count,
  name,
  isFavorit,
  description,
  rating,
  imageUrl,
  favourite_id,
  id,
  icon,
}: {
  id: number;
  review_count: number;
  rating: number;
  name: string;
  imageUrl: string;
  favourite_id: number | null;
  isFavorit: boolean;
  description: string;
  icon: { image: string; name: string };
}) {
  const t = await getTranslations();
  return (
    <div>
      <h1 className="text-text 3xl mb-6 font-bold md:text-5xl">
        {t("TEXT.productDetails", { name })}
      </h1>

      <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={imageUrl}
          alt={name}
          width={900}
          height={500}
          className="aspect-video h-auto w-full object-cover"
        />
      </div>

      <div className="mb-8 rounded-lg p-2 md:p-6">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-text text-2xl font-bold md:text-4xl">
                {name}
              </h2>
              <Image
                src={icon.image}
                alt={icon.name}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <ReviewStars
              productRating={rating}
              productTotalReviews={review_count}
            />
          </div>
          <div className="flex gap-3">
            <FavoritButton
              isFavorit={isFavorit}
              favId={favourite_id!}
              id={id}
            />
            <Button
              variant="ghost"
              className="bg-primary/5 size-8 cursor-pointer rounded-full"
            >
              <Share2
                className="text-primary hover:text-primary/50 cursor-pointer"
                size={24}
              />
            </Button>
          </div>
        </div>

        <p className="text-sub mb-6 leading-relaxed">{description}</p>

        <div className="mb-6">
          <h3 className="text-text mb-2 text-xl font-semibold">
            {t("TEXT.notes")}
          </h3>
          <Textarea
            className="border-0 bg-white shadow-none"
            placeholder="Write notes here"
          />
        </div>

        <Separator className="my-6" />
      </div>
    </div>
  );
}

export default Item;
