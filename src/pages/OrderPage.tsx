import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Coupon } from "@/types/coupon";
import { getAvailableCoupons } from "@/mocks/data/coupons";
import { CouponCard } from "@/components/cards/couponCard";
import { X } from "lucide-react";

function OrderPage() {
    const orderPrice = 80000;
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const availableSortedCoupons = useMemo(() => {
        const available = getAvailableCoupons(orderPrice); // 사용가능 쿠폰 리스트
        return [...available].sort((a, b) => a.id - b.id); // 오름차순 정렬
    }, [orderPrice]);
    return (
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto">
                <h1 className="text-[32px] font-semibold text-gray-500 ml-2 mb-10 text-left">
                    주문서 작성
                </h1>

                <Card className="w-full pt-8 pb-10 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
                    <div className="flex flex-col gap-7">
                        <div className="text-[28px] font-semibold text-gray-500 ml-1 leading-none">
                            쿠폰 적용
                        </div>

                        <div className="flex flex-col">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className={cn(
                                    "flex items-center px-4 w-full h-14 rounded-md border text-[24px] shadow-xs transition-all outline-none bg-white",
                                    "border-pink-300",
                                    "hover:border-pink-400 hover:bg-pink-50/30 cursor-pointer",
                                    "focus:ring-[3px] focus:ring-pink-400/30 focus:border-pink-400",
                                    selectedCoupon
                                        ? "text-gray-500 font-medium"
                                        : "text-gray-300 font-regular"
                                )}
                            >
                                {selectedCoupon ? `${selectedCoupon.discountRate}% ${selectedCoupon.title}` : "사용할 쿠폰을 선택하세요."}
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative w-full max-w-4xl max-h-[900px] bg-white rounded-3xl shadow-xl p-10 animate-in fade-in zoom-in duration-200 flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-[32px] font-bold text-gray-500">쿠폰 선택</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer -mt-2 -mr-2 p-2"
                            >
                                <X size={32} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="overflow-y-auto pr-6 custom-scrollbar flex-1">
                            {availableSortedCoupons.length > 0 ? (
                                <div className="grid grid-cols-2 gap-8">
                                    {availableSortedCoupons.map((coupon) => (
                                        <div
                                            key={coupon.id}
                                            onClick={() => {
                                                setSelectedCoupon(coupon);
                                                setIsModalOpen(false);
                                            }}
                                        >
                                            <CouponCard
                                                coupon={coupon}
                                                isHighlighted={selectedCoupon?.id === coupon.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                                    <p className="text-gray-300 text-[20px]">사용 가능한 쿠폰이 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderPage;