import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Coupon } from "@/types/coupon";
import { getAvailableCoupons } from "@/mocks/data/coupons";
import { CouponCard } from "@/components/cards/couponCard";
import { X } from "lucide-react";

function OrderPage() {
    const orderPrice = 80000;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryMessage, setDeliveryMessage] = useState("");

    const isOrderValid = name.trim() !== "" && phone.trim() !== "" && address.trim() !== "";
    const availableSortedCoupons = useMemo(() => {
        const available = getAvailableCoupons(orderPrice);
        return [...available].sort((a, b) => a.id - b.id);
    }, [orderPrice]);

    return (
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto space-y-10">
                <h1 className="text-[32px] font-semibold text-gray-500 ml-2 mb-10 text-left">
                    주문서 작성
                </h1>

                <Card className="w-full pt-8 pb-10 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
                    <div className="flex flex-col gap-7  text-[24px]">
                        <div className="text-[28px] font-semibold text-gray-500 ml-1 leading-none">
                            배송지 정보
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Label className="font-medium text-gray-500 ml-1">받는 분<span className="text-red">*</span></Label>
                                    <Input placeholder="이름을 입력해주세요" className="h-16 !text-[24px]" value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-medium text-gray-500 ml-1">전화번호<span className="text-red">*</span></Label>
                                    <Input placeholder="010-0000-0000" className="h-16 !text-[24px]" value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="font-medium text-gray-500 ml-1">주소<span className="text-red">*</span></Label>
                                <Input placeholder="도로명 주소를 입력해주세요" className="h-16 !text-[24px]" value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className="space-y-4">
                                <Label className="font-medium text-gray-500 ml-1">상세주소</Label>
                                <Input placeholder="상세 주소를 입력해주세요" className="h-16 !text-[24px]" />
                            </div>

                            <div className="space-y-4">
                                <Label className="font-medium text-gray-500 ml-1">배송 메시지</Label>
                                <textarea
                                    value={deliveryMessage}
                                    onChange={(e) => setDeliveryMessage(e.target.value)}
                                    className="w-full min-h-[140px] p-4 rounded-md border border-pink-300 focus:ring-[3px] focus:ring-pink-400/30 focus:border-pink-400 outline-none transition-all resize-none placeholder:text-muted-foreground text-[24px]"
                                    placeholder="배송 시 요청사항을 적어주세요"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
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
                                    "flex items-center px-4 w-full h-16 rounded-md border text-[24px] shadow-xs transition-all outline-none bg-white",
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
                <div className="pt-4 flex items-center justify-center">
                    <Button
                        className="w-[300px] h-18 text-[28px] font-semibold rounded-xl"
                        disabled={!isOrderValid}
                    >
                        주문하기
                    </Button>
                </div>
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