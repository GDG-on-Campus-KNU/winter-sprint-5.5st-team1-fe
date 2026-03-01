import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderData } from "@/types/order";
interface OrderInfoCardProps {
    order: OrderData;
}
export function OrderInfoCard({ order }: OrderInfoCardProps) {
    return (
        <Card className="w-full max-w-6xl p-6 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <article className="flex flex-col gap-5">
                <header className="flex justify-between items-center">
                    <div className="text-[24px] font-medium">
                        <span className="text-black">주문번호 </span>
                        <span className="text-pink-500">
                            {order.orderNumber}
                        </span>
                    </div>
                    <span className="text-pink-500 text-[24px] font-medium">
                        {order.status}
                    </span>
                </header>
                <div className="text-[20px] font-normal text-gray-500 leading-tight">
                    {order.items.map((item, idx) => (
                        <span key={idx}>
                            {item.name} ({item.quantity}개)
                            {idx < order.items.length - 1 && ", "}
                        </span>
                    ))}
                </div>
                <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex text-[20px] font-regular text-gray-400">
                        <span className="w-20 shrink-0">배송지</span>
                        <span className="truncate">
                            {order.address}
                        </span>
                    </div>
                    <div className="flex text-[20px] font-regular text-gray-400">
                        <span className="w-20 shrink-0">주문일</span>
                        <span>{order.orderDate}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex items-baseline text-[20px] font-semibold text-gray-500">
                            <span className="w-20 shrink-0">총 금액</span>
                            <span className="text-[24px]">
                                ₩{order.totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            className="h-auto py-2 px-5 text-[20px] border-pink-500 text-pink-500 hover:bg-pink-200/50">
                            상세보기
                        </Button>
                    </div>
                </div>
            </article>
        </Card>
    );
}