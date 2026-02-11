import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card";
import { CouponData } from "@/types/coupon";

export function CouponCard() {
    const coupon: CouponData = {
        title: "10주년 기념 감사 할인 쿠폰",
        discountRate: 30,
        minOrderPrice: 50000,
        expiryDate: "2026년 3월 11일까지"
    };
    return (
        <Card className="w-full max-w-sm justify-center p-6 border border-gray-100 shadow-sm bg-white rounded-xl text-left h-[216px]">
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