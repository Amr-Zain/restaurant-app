import { Star } from "lucide-react";

function ReviewStars({
  productRating,
  productTotalReviews,
}: {
  productRating: number;
  productTotalReviews?: number;
}) {
  return (
    <div className="mb-4 flex items-center text-yellow-500">
      {[...Array(5)].map((_, i) => {
        const fillPercentage = Math.max(0, Math.min(1, productRating - i)) * 100;
        
        return (
          <div key={i} className="relative h-5 w-5">
            {/* Empty star background */}
            <Star
              size={20}
              className="absolute text-gray-300"
              fill="none"
              stroke="currentColor"
            />
            
            {/* Filled portion - clipped to exact percentage */}
            <div 
              className="absolute top-0 h-full overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                size={20}
                className="text-review"
                fill="currentColor"
                stroke="currentColor"
              />
            </div>
          </div>
        );
      })}
      <span className="ml-2 font-semibold text-text">{productRating}</span>
      {productTotalReviews&&<span className="ml-1 text-text">({productTotalReviews} reviews)</span>}
    </div>
  );
}

export default ReviewStars;