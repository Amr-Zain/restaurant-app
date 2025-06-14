import { Share2 } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import ReviewStars from "./ReviewStars";
import FavoritButton from "../menu/FavoritButton";
import { Textarea } from "@/components/ui/textarea";

function Item({
  review_count,
  name,
  isFavorit,
  description,
  rating,imageUrl,
  favourite_id,
  id
}: {
  id: number;
  review_count: number;
  rating: number;
  name: string;
  imageUrl: string;
  favourite_id: number |null;
  isFavorit: boolean;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-text mb-6 text-2xl font-bold">{name} Details</h1>

      <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
        <Image
          src={imageUrl}
          alt={name}
          width={900}
          height={500}
          className="aspect-video h-auto w-full object-cover"
        />
      </div>

      <div className="mb-8 rounded-l p-6">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h2 className="text-text text-3xl font-bold">{name}</h2>
            <ReviewStars
              productRating={rating}
              productTotalReviews={review_count}
            />
          </div>
          <div className="flex gap-3">
            <FavoritButton isFavorit={isFavorit} favId={favourite_id!} id={id}/>
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
          <h3 className="text-text mb-2 text-xl font-semibold">Notes</h3>
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
