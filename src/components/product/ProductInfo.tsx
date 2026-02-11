import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { ProductRating } from "./ProductRating";
import { QuantitySelector } from "./QuantitySelector";
import { Product } from "../../types/product.type";
import { useCartStore } from "../../stores/cart.store";
import { Badge } from "../../components/badge";

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
      price: product.price,
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
          {formatPrice(product.price)}
        </span>
        <Badge percentage={product.discountRate} />
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
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-500 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
        >
          <ShoppingCart size={20} />
          장바구니 담기
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded hover:bg-gray-50"
        >
          바로 구매
        </button>
      </div>
    </div>
  );
};
