import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function OrderSummaryCard() {
    const summary = {
        subtotal: 1588000,
        shipping: 0,
        total: 1588000
    };

    return (
        <Card className="w-full max-w-6xl p-6 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <div className="flex flex-col gap-5">
                <div className="text-[24px] font-semibold text-black">
                    주문 요약
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[20px] font-normal text-gray-400">
                        <span>상품 금액</span>
                        <span className="text-gray-500 font-semibold">₩{summary.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[20px] font-normal text-gray-400">
                        <span>배송비</span>
                        <span className="text-gray-500 font-semibold">₩{summary.shipping.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 pt-4 border-t border-gray-100 flex justify-between items-baseline font-semibold text-black">
                        <span className="text-[20px]">총 금액</span>
                        <span className="text-[24px]">
                            ₩{summary.total.toLocaleString()}
                        </span>
                    </div>
                </div>
                <Button className="w-full h-14 text-[22px] font-bold bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-sm">
                    주문하기
                </Button>
            </div>
        </Card>
    );
}