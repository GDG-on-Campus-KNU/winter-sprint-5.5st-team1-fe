import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  totalPrice: number;
  deliveryFee: number;
  selectedCount: number;
  onOrder: () => void;
  className?: string;
}

export default function CartSummary({
  totalPrice,
  deliveryFee,
  selectedCount,
  onOrder,
  className,
}: CartSummaryProps) {
  const finalPrice = totalPrice + (totalPrice > 0 ? deliveryFee : 0);

  return (
    <Card
      className={cn(
        "z-10 w-full rounded-t-2xl border-x-0 border-b-0 border-t bg-white pt-6 pb-8 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-3 text-24 text-gray-400">
        <div className="flex justify-between">
          <span>상품금액</span>
          <span className="text-gray-600">{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span className="text-gray-600">
            {totalPrice > 0 ? `+${deliveryFee.toLocaleString()}원` : "0원"}
          </span>
        </div>

        <div className="mt-2 flex justify-between border-t pt-4 text-20 font-bold text-gray-700">
          <span>최종 결제금액</span>
          <span className="text-pink-500">{finalPrice.toLocaleString()}원</span>
        </div>

        {totalPrice > 0 && (
          <div className="flex items-center gap-1.5 text-[15px] text-pink-400">
            <Tag className="h-3.5 w-3.5" />
            <span>다음단계에서 쿠폰을 적용할 수 있습니다</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          onClick={onOrder}
          disabled={selectedCount === 0}
          className="w-full h-14 rounded-2xl text-20 text-white "
        >
          {selectedCount > 0
            ? `${selectedCount}개 상품 주문하기`
            : "상품을 선택해주세요"}
        </Button>
      </CardFooter>
    </Card>
  );
}
