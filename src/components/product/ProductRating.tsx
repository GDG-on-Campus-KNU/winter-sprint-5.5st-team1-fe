import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const ProductRating = ({
  rating,
  maxRating = 5,
  className
}: ProductRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => {
          const starIndex = i + 1;
          const fillAmount = Math.min(Math.max(rating - (starIndex - 1), 0), 1);

          return (
            <div key={starIndex} className="relative">
              <Star size={24} className="text-yellow" fill="none" strokeWidth={2} />
              <div className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillAmount * 100}%` }} >
                <Star size={24} className="text-yellow fill-yellow" strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-gray-300 font-regular text-[20px] ml-1">
        ({rating}점)
      </span>
    </div>
  );
};
