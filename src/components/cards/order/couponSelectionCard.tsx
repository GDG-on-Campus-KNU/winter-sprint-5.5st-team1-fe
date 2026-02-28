import { useFormContext, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OrderFormType } from "@/schemas/orderForm";

interface Props {
    onOpenModal: () => void;
}

export function CouponSelectionCard({ onOpenModal }: Props) {
    const { control } = useFormContext<OrderFormType>();
    const selectedCoupon = useWatch({
        control,
        name: "selectedCoupon",
    });
    return (
        <Card className="w-full pt-8 pb-10 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <section className="flex flex-col gap-7" aria-label="적용 쿠폰 선택">
                <h2 className="text-[28px] font-semibold text-gray-500 ml-1">
                    쿠폰 적용
                </h2>

                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={onOpenModal}
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
                        {selectedCoupon ? `(${selectedCoupon.discountRate}%) ${selectedCoupon.title}` : "사용할 쿠폰을 선택하세요"}
                    </button>
                </div>
            </section>
        </Card>
    )
}