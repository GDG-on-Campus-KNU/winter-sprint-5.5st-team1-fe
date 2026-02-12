import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { ProductRating } from "./ProductRating";
import { QuantitySelector } from "./QuantitySelector";
import { Product } from "../../types/product";
import { useCartStore } from "../../stores/cart.store";
import { Badge } from "../../components/badge";
import { Button } from "../../components/ui/button";
interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.currentPrice,
      quantity,
      imageUrl: product.imageUrl,
    });
    alert("장바구니에 추가되었습니다");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  const formatPrice = (price: number) => `₩${price.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <ProductRating rating={product.rating} />

      <div className="flex items-center gap-3">
        <span className="text-gray-400 line-through text-lg">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="text-3xl font-bold text-red-500">
          {formatPrice(product.currentPrice)}
        </span>
        <Badge>{product.discountRate}% 할인</Badge>{" "}
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-600">
          📦 배송비: {formatPrice(product.shippingFee)}(
          {formatPrice(product.freeShippingThreshold)} 이상 무료배송)
        </p>
      </div>

      <div>
        <p className="text-gray-600">📦 재고: {product.stock}개</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">상품 설명</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="border-t pt-4">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          max={product.stock}
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleAddToCart} size="lg" className="flex-1">
          <ShoppingCart className="w-5 h-5" />
          장바구니 담기
        </Button>

        <Button
          onClick={handleBuyNow}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          바로 구매
        </Button>
      </div>
    </div>
  );
};
