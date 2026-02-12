import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  maxRating?: number;
}

export const ProductRating = ({
  rating,
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
                ? "fill-yellow text-yellow"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <span className="text-gray-600 font-medium">({rating})</span>
    </div>
  );
};
