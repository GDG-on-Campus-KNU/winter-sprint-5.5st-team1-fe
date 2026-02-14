import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    isOrderValid: boolean;
}
export function OrderSummaryCard({ subtotal, discount, shipping, total, isOrderValid }: OrderSummaryProps) {
    return (
        <Card className="w-xl p-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <div className="flex flex-col gap-5">
                <div className="text-[28px] font-semibold text-black">
                    주문 요약
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <span>상품 금액</span>
                        <span className="text-gray-500 font-medium">₩{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <span>할인 금액</span>
                        <span className="text-gray-500 font-medium">₩{discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <span>배송비</span>
                        <span className="text-gray-500 font-medium">₩{shipping.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 pt-4 border-t border-gray-100 flex justify-between items-baseline font-semibold text-gray-500">
                        <span className="text-[24px]">최종 금액</span>
                        <span className="text-[24px]">
                            ₩{total.toLocaleString()}
                        </span>
                    </div>
                </div>
                <Button className="w-full h-16 text-[24px] font-bold bg-pink-500 hover:bg-pink-500/80 text-white rounded-lg shadow-sm" disabled={!isOrderValid}>
                    주문하기
                </Button>
            </div>
        </Card>
    );
}