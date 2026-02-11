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

      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
        {discountRate}% 할인
      </span>
    </div>
  );
};
