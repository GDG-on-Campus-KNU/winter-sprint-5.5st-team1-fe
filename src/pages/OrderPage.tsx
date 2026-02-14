import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

function OrderPage() {
    const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

    return (
        // 1. 전체 배경 및 좌우 120px 패딩 설정
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto">
                {/* 2. 메인 타이틀 정렬 */}
                <h1 className="text-[28px] font-semibold text-gray-500 ml-2 mb-10 text-left">
                    주문서 작성
                </h1>

                {/* 3. max-w-4xl을 삭제하여 가로를 꽉 채운 카드
                   상단 pt-6, 하단 pb-8로 시각적 무게 중심 보정
                */}
                <Card className="w-full pt-8 pb-10 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
                    <div className="flex flex-col gap-7">
                        {/* 타이틀 텍스트 상단 공백 제거 */}
                        <div className="text-[28px] font-semibold text-gray-500 ml-1 leading-none">
                            쿠폰 적용
                        </div>

                        <div className="flex flex-col">
                            {/* 인풋 스타일 버튼 */}
                            <button
                                type="button"
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
                                {selectedCoupon ? "쿠폰 선택 완료" : "사용할 쿠폰을 선택하세요."}
                            </button>
                        </div>
                    </div>
                </Card>

                {/* 상태 변화 테스트 버튼 (개발 완료 후 삭제) */}
                <div className="mt-6 ml-2 text-left">
                    <button
                        onClick={() => setSelectedCoupon(selectedCoupon ? null : "완료")}
                        className="text-[14px] text-pink-400 underline opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        (테스트: 쿠폰 선택 상태 변경)
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;