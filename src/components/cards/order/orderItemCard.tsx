import { Card } from "@/components/ui/card";
import { CartItem } from "@/stores/cart.store";
import { OrderItem } from "./orderItem";
interface OrderItemCardProps {
    items: CartItem[];
}
export function OrderItemCard({ items }: OrderItemCardProps) {
    return (
        <Card className="w-full pt-8 pb-5 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <div className="text-[28px] font-semibold text-gray-500 ml-1">
                주문 상품
            </div>

            <div className="flex flex-col">
                {items.map((item) => (
                    <OrderItem key={item.productId} item={item} />
                ))}
            </div>
        </Card>
    );
}