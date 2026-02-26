import { Card } from "@/components/ui/card";
import { CartItem } from "@/stores/cart.store";
import { OrderItem } from "./orderItem";
interface OrderItemListProps {
    items: CartItem[];
}
export function OrderItemList({ items }: OrderItemListProps) {
    return (
        <section className="w-full" aria-label="주문 상품 목록">
            <Card className="w-full pt-8 pb-5 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
                <h3 className="text-[28px] font-semibold text-gray-500 ml-1">
                    주문 상품
                </h3>
                <ul className="flex flex-col p-0 m-0 list-none">
                    {items.map((item) => (
                        <li key={item.productId} className="w-full py-5 border-b border-gray-100 last:border-0 first:-mt-4">
                            <OrderItem item={item} />
                        </li>
                    ))}
                </ul>
            </Card>
        </section >
    );
}