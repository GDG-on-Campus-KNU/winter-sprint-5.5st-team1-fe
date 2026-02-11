import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  maxRating?: number;
}

export const ProductRating = ({
  rating,
  reviewCount,
  maxRating = 5,
}: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <span className="text-gray-600 font-medium">({rating})</span>

      {reviewCount !== undefined && (
        <span className="text-gray-400 text-sm">리뷰 {reviewCount}개</span>
      )}
    </div>
  );
};
