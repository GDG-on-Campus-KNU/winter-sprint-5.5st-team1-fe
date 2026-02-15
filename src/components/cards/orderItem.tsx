import { CartItem } from "@/stores/cart.store";
import { cn } from "@/lib/utils";

interface OrderItemProps {
    item: CartItem;
}

export function OrderItem({ item }: OrderItemProps) {
    return (
        <div className={cn(
            "flex items-center gap-6 py-5 border-b border-gray-100 last:border-0",
            "first:-mt-4"
        )}>
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-0 min-w-0">
                <h4 className="text-[24px] font-medium text-gray-500 truncate">
                    {item.name}
                </h4>
                <div className="text-[20px] font-regular text-gray-400">
                    수량 : {item.quantity}
                </div>
            </div>

            <div className="flex flex-col gap-0 min-w-0 text-right">
                <div className="text-[24px] font-medium text-gray-500 whitespace-nowrap">
                    ₩{(item.price * item.quantity).toLocaleString()}
                </div>
                <div className="text-[20px] font-regular text-gray-400 whitespace-nowrap">
                    ₩{(item.price).toLocaleString()} * {item.quantity}
                </div>
            </div>
        </div>
    );
}