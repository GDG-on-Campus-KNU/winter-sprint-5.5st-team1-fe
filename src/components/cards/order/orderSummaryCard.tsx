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
        <Card className="w-full pt-8 pb-[38.5px] px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <section className="flex flex-col gap-5" aria-label="주문 요약">
                <h2 className="text-[28px] font-semibold text-gray-500">
                    주문 요약
                </h2>
                <dl className="flex flex-col gap-2 m-0 p-0">
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <dt className="m-0 p-0">상품 금액</dt>
                        <dd className="text-gray-500 font-medium m-0 p-0">₩{subtotal.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <dt className="m-0 p-0">할인 금액</dt>
                        <dd className="text-gray-500 font-medium m-0 p-0">₩{discount.toLocaleString()}</dd>    </div>
                    <div className="flex justify-between text-[24px] font-regular text-gray-400">
                        <dt className="m-0 p-0">배송비</dt>
                        <dd className="text-gray-500 font-medium m-0 p-0">₩{shipping.toLocaleString()}</dd>   </div>
                    <div className="mt-2 pt-4 border-t border-gray-100 flex justify-between items-baseline font-semibold text-gray-500">
                        <dt className="text-[24px] m-0 p-0">최종 금액</dt>
                        <dd className="text-[24px] m-0 p-0">₩{total.toLocaleString()}</dd>
                    </div>
                </dl>
                <Button className="w-full h-16 text-[24px] font-bold bg-pink-500 hover:bg-pink-500/80 text-white rounded-lg shadow-sm" disabled={!isOrderValid}>
                    주문하기
                </Button>
            </section>
        </Card>
    );
}