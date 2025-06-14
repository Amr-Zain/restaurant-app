import { Star } from "lucide-react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import ReviewStars from "./ReviewStars";
import { getProductReviews } from "@/services/ApiHandler";

async function ItemReviews({ itemId }: { itemId: number }) {

  const review = await getProductReviews(itemId);
  const customerReviews = review.data;
  const productRating = review.rate;
  const productTotalReviews = review.review_count;

  const ratingBreakdown = review.star_rate
    .map((star) => {
      const ratingNumber = parseInt(star.key.replace("star_", ""), 10);
      return {
        rating: ratingNumber,
        percentage: star.value,
        count: star.value,
      };
    })
    .sort((a, b) => b.rating - a.rating);
  return (
    <div className="container border-primary/20 flex flex-col md:flex-row gap-6 rounded-xl border-1 p-6">
      <div className="mb-8 flex shrink-0 basis-80 flex-col items-center gap-8">
        <div className="flex flex-shrink-0 flex-col items-center">
          <h2 className="text-text mb-6 text-2xl font-bold">Customer Review</h2>
          <span className="text-5xl font-extrabold text-gray-900">
            {productRating.toFixed(1)}
          </span>{" "}
          <div className="mb-2 flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                fill={i < Math.floor(productRating) ? "currentColor" : "none"}
                stroke={i < Math.floor(productRating) ? "currentColor" : "gray"}
                className={
                  i < productRating ? "text-yellow-500" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-600">({productTotalReviews} reviews)</span>
        </div>
        <div className="w-full shrink-0">
          {ratingBreakdown.map((breakdown) => (
            <div
              key={breakdown.rating}
              className="mb-2 flex items-center gap-2"
            >
              <span className="text-text flex w-8 gap-1 text-right font-medium">
                {breakdown.rating}{" "}
                <Star
                  size={16}
                  fill="currentColor"
                  className="text-review inline-block"
                />
              </span>
              <Progress
                value={breakdown.percentage}
                className="!text-review h-2 w-full bg-gray-200"
              />
              <span className="w-10 text-left text-sm text-gray-500">
                {breakdown.count}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grow-1 space-y-6">
        {customerReviews.map((review) => (
          <div key={review.id} className="w-full border-t border-gray-100 pt-6">
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex justify-between items-start w-full ">
                <div className="flex gap-2">
                  {review.user.avatar ? (
                    <Image
                      src={review.user.avatar}
                      alt={review.user.full_name}
                      width={40}
                      height={40}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                      {review.user.full_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.user.full_name}
                    </h4>
                    <ReviewStars productRating={review.rate} />
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {review.created_at}
                </span>
              </div>
            </div>
            <p className="text-sub line-clamp-2">{review.review} flex size-10 items-center justify-center rounded-fullflex size-10 items-center justify-center rounded-fullflex size-10 items-center justify-center rounded-fullflex size-10 items-center justify-center rounded-fullflex size-10 items-center justify-center rounded-fullflex size-10 items-center justify-center rounded-full</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemReviews;
