import { Badge } from "../../badge";
import { ProductRating } from "../../product/ProductRating";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { Product } from "@/types/product";
import { STATUS_CONFIG } from "@/types/product";

interface AdminItemProps {
    item: Product;
    isLast?: boolean;
}

export function AdminItem({ item, isLast }: AdminItemProps) {
    const config = STATUS_CONFIG[item.status];
    return (
        <div className={`flex w-full items-stretch divide-x border-b divide-gray-200 border-gray-200 py-6 ${isLast ? "border-b=0" : "border-b"}`}>
            <div className="w-48 flex items-center justify-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex flex-1 min-w-[240px] items-center pl-8 gap-4 overflow-hidden">
                <h4 className="text-[24px] font-semibold text-gray-500 truncate">
                    {item.name}
                </h4>
                <Badge className="bg-red" percentage={item.discountRate} />
            </div>
            <div className="flex min-w-0 overflow-hidden">
                <div className="flex pl-8 flex-col w-60 pl-8 justify-center">
                    <span className="text-pink-500 font-semibold text-[24px]">
                        ₩{item.currentPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-300 line-through font-regular text-[20px]">
                        ₩{item.originalPrice.toLocaleString()}
                    </span>
                </div>

            </div>
            <div className="flex justify-center items-center w-32">
                <Badge className="bg-pink-500">
                    {item.stock}
                </Badge>
            </div>
            <div className="flex justify-center w-72">
                <ProductRating rating={item.rating} />
            </div>
            <div className="flex justify-center items-center w-40">
                <Badge className={config.className}>{config.label}</Badge>
            </div>
            <div className="flex items-center justify-center w-40">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button className="p-2 text-pink-500 hover:bg-pink-500/10 transition-colors border-pink-500">
                        <Pencil size={24} />
                    </button>
                    <button className="p-2 text-red hover:bg-red/10 transition-colors border-red">
                        <Trash size={24} />
                    </button>
                </div>
            </div>
        </div>
    )

}