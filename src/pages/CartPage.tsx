import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItem from "../components/cards/cart/cartItemCard";
import CartSummary from "../components/cards/cart/cartSummaryCard";
import { ShoppingCart } from "lucide-react";

const DELIVERY_FEE = 3000;

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    handleUpdateQuantity,
    handleRemoveItem,
    handleRemoveSelected,
    calcTotal,
  } = useCart();

  const [checkedIds, setCheckedIds] = useState<number[]>(() =>
    items.map((i) => i.productId),
  );

  const isAllChecked = items.length > 0 && checkedIds.length === items.length;

  const handleAllCheck = () => {
    setCheckedIds(isAllChecked ? [] : items.map((i) => i.productId));
  };

  const handleCheck = (productId: number) => {
    setCheckedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleDeleteSelected = async () => {
    await handleRemoveSelected(checkedIds);
    setCheckedIds([]);
  };

  const handleOrder = () => {
    navigate("/order");
  };

  const totalPrice = calcTotal(checkedIds);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-40 text-gray-300">
        <ShoppingCart className="h-16 w-16" />
        <p className="text-[18px] font-medium">장바구니가 비어있어요</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-2xl bg-pink-500 px-8 py-3 text-white font-semibold hover:bg-pink-400 transition-colors"
        >
          쇼핑하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* 상품 영역: 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <h1 className="mb-6 text-[24px] font-bold text-gray-500">장바구니</h1>

          {/* 전체 선택 / 선택 삭제 */}
          <div className="mb-4 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-[15px] text-gray-400">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllCheck}
                className="h-5 w-5 accent-pink-500"
              />
              전체 선택 ({checkedIds.length}/{items.length})
            </label>
            <button
              onClick={handleDeleteSelected}
              disabled={checkedIds.length === 0}
              className="text-[14px] text-gray-300 hover:text-red disabled:opacity-30 transition-colors"
            >
              선택 삭제
            </button>
          </div>

          {/* 상품 목록 */}
          <div className="flex flex-col gap-3 mb-6">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                isChecked={checkedIds.includes(item.productId)}
                onCheck={handleCheck}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={(productId) => {
                  handleRemoveItem(productId);
                  setCheckedIds((prev) =>
                    prev.filter((id) => id !== productId),
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 ">
        <div className="max-w-2xl mx-auto px-4 pb-6 pt-4">
          <CartSummary
            totalPrice={totalPrice}
            deliveryFee={DELIVERY_FEE}
            selectedCount={checkedIds.length}
            onOrder={handleOrder}
          />
        </div>
      </div>
    </div>
  );
}
