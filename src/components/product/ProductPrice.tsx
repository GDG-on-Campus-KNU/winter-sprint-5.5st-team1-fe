import { Badge } from "@/components/badge";
interface ProductPriceProps {
  price: number;
  originalPrice: number;
  discountRate: number;
}

export const ProductPrice = ({
  price,
  originalPrice,
  discountRate,
}: ProductPriceProps) => {
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 line-through text-lg">
        {formatPrice(originalPrice)}
      </span>

      <span className="text-3xl font-bold text-red-500">
        {formatPrice(price)}
      </span>

      <Badge percentage={discountRate} className="bg-pink text-white font-bold">
        {discountRate}% 할인
      </Badge>
    </div>
  );
};
