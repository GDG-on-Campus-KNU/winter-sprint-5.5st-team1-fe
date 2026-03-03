import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { Product, STATUS_CONFIG } from "../../types/product";
import { Button } from "../../components/ui/button";
import instance from "@/lib/axios";

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 30000;

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  const isSoldOut = product.status === "SOLD_OUT" || product.stock === 0;
  const statusConfig = STATUS_CONFIG[product.status];
  const shippingFeeText =
    product.currentPrice * quantity >= FREE_SHIPPING_THRESHOLD
      ? "무료배송"
      : `₩${SHIPPING_FEE.toLocaleString()}`;

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await instance.post("/api/v1/cart", {
        product_id: product.id,
        quantity,
      });
      alert("장바구니에 추가되었습니다");
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response
        ?.status;
      if (status === 401) {
        alert("로그인이 필요합니다");
        window.location.href = "/login";
      } else {
        alert("장바구니 담기에 실패했습니다");
      }
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const selectedItem = {
      productId: product.id,
      name: product.name,
      price: product.currentPrice,
      quantity: quantity,
      imageUrl: product.imageUrl,
    }
    navigate("/order", { state: { selectedItems: [selectedItem], isDirectBuy: true } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <h1 className="text-3xl font-bold flex-1">{product.name}</h1>
        <span
          className={`text-xs text-white px-2 py-1 rounded-full whitespace-nowrap ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-red-500">
          ₩{product.currentPrice.toLocaleString()}
        </span>
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-600">
          📦 배송비: {shippingFeeText}
          {product.currentPrice * quantity < FREE_SHIPPING_THRESHOLD && (
            <span className="text-sm text-gray-400 ml-1">
              (₩{FREE_SHIPPING_THRESHOLD.toLocaleString()} 이상 무료배송)
            </span>
          )}
        </p>
      </div>

      <div>
        <p className="text-gray-600">📦 재고: {product.stock}개</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">상품 설명</h3>
        <p className="text-gray-600 whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {!isSoldOut && (
        <div className="border-t pt-4">
          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            max={product.stock}
          />
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1"
          disabled={isSoldOut || cartLoading}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartLoading ? "처리 중..." : "장바구니 담기"}
        </Button>

        <Button
          onClick={handleBuyNow}
          variant="outline"
          size="lg"
          className="flex-1"
          disabled={isSoldOut || cartLoading}
        >
          바로 구매
        </Button>
      </div>

      {isSoldOut && (
        <p className="text-center text-gray-400 text-sm">품절된 상품입니다</p>
      )}
    </div>
  );
};
