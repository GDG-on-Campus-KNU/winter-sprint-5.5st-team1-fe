import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card";
import { Coupon } from "@/types/coupon";
import { cn } from "@/lib/utils";

interface CouponCardProps {
    coupon: Coupon;
    isHighlighted?: boolean;
}

export function CouponCard({ coupon, isHighlighted }: CouponCardProps) {

    return (
        <Card className={cn(
            "w-full max-w-sm justify-center p-6 border shadow-sm bg-white rounded-xl text-left h-[216px] hover:bg-pink-50/30",
            isHighlighted ? "border-pink-400" : "border-gray-100"
        )}>
            <div className="space-y-2">
                <span className="text-[40px] font-bold text-pink-500">
                    {coupon.discountRate}%
                </span>
                <h3 className="text-[20px] mt-2 font-semibold text-pink-500">
                    {coupon.title}
                </h3>

                <div className="space-y-1 pt-2">
                    <p className="text-[20px] text-gray-300 font-regular">
                        최소 주문 금액: ₩{coupon.minOrderPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center font-regular gap-2 text-gray-300 text-[20px]">
                        <Calendar size={20} />
                        <span>{coupon.expiryDate}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}