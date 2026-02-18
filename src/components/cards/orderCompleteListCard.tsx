import { Card } from "@/components/ui/card";
import { OrderData } from "@/types/order";

export interface OrderCompleteData extends OrderData {
    recipient: string,
    phone: string, 
    deliveryMessage: string;
}

interface OrderCompleteListCardProps {
    order: OrderCompleteData;
}

export function OrderCompleteListCard({ order }: OrderCompleteListCardProps) {
    return (
        <Card className="w-full max-w-4xl p-9 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <div className="flex flex-col gap-5">
                
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-medium">
                        <span className="text-black">주문번호: </span>
                        <span className="text-pink-500">{order.orderNumber}</span>
                    </div>
                </div>
                
                <div className="text-xl font-normal text-gray-500 leading-tight">
                    {order.items.map((item, idx) => (
                        <span key={idx}>
                            {item.name} ({item.quantity}개)
                            {idx < order.items.length - 1 && ", "}
                        </span>
                    ))}
                </div>
                
                <div className="pt-4 border-t border-gray-100 space-y-3">

                    <div className="flex text-xl font-regular text-gray-400">
                        <span className="w-24 shrink-0">받는 분</span>
                        <span className="truncate">{order.recipient}</span>
                    </div>

                    <div className="flex text-xl font-regular text-gray-400">
                        <span className="w-24 shrink-0">연락처</span>
                        <span className="truncate">{order.phone}</span>
                    </div>

                    <div className="flex text-xl font-regular text-gray-400">
                        <span className="w-24 shrink-0">배송지</span>
                        <span className="truncate">{order.address}</span>
                    </div>

                    <div className="flex text-xl font-regular text-gray-400">
                        <span className="w-24 shrink-0">요청사항</span>
                        <span className="truncate">{order.deliveryMessage}</span>
                    </div>

                    <div className="flex text-xl font-regular text-gray-400">
                        <span className="w-24 shrink-0">주문일</span>
                        <span>{order.orderDate}</span>
                    </div>

                    <div className="flex justify-between items-end pt-2">
                        <div className="flex items-baseline text-xl font-semibold text-gray-500">
                            <span className="w-24 shrink-0">총 금액</span>
                            <span className="text-2xl">
                                ₩{order.totalPrice.toLocaleString()}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </Card>
    );
}