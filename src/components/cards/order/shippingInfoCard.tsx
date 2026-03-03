import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderFormType } from "@/schemas/orderForm";

export function ShippingInfoCard() {
    const { register, formState: { errors } } = useFormContext<OrderFormType>();

    return (
        <Card className="w-full pt-8 pb-10 px-8 border border-gray-100 shadow-sm bg-white rounded-xl text-left">
            <section className="flex flex-col gap-7 text-[24px]" aria-label="배송지 정보 입력">
                <h2 className="text-[28px] font-semibold text-gray-500 ml-1">
                    배송지 정보
                </h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Label className="font-medium text-gray-500 ml-1">받는 분<span className="text-red">*</span></Label>
                            <Input placeholder="이름을 입력해주세요" className="h-16 !text-[24px]" {...register("shippingInfo.name")} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Label className="font-medium text-gray-500 ml-1">전화번호<span className="text-red">*</span></Label>
                                {errors.shippingInfo?.phone?.message && (
                                    <span className="text-red text-[16px] font-medium">
                                        {errors.shippingInfo.phone.message}
                                    </span>
                                )}
                            </div>
                            <Input placeholder="010-0000-0000" className="h-16 !text-[24px]" {...register("shippingInfo.phone")} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="font-medium text-gray-500 ml-1">주소<span className="text-red">*</span></Label>
                        <Input placeholder="도로명 주소를 입력해주세요" className="h-16 !text-[24px]"{...register("shippingInfo.address")} />
                    </div>

                    <div className="space-y-4">
                        <Label className="font-medium text-gray-500 ml-1">상세주소</Label>
                        <Input placeholder="상세 주소를 입력해주세요" className="h-16 !text-[24px]" {...register("shippingInfo.detailAddress")} />
                    </div>

                    <div className="space-y-4">
                        <Label className="font-medium text-gray-500 ml-1">배송 메시지</Label>
                        <textarea
                            className="w-full min-h-[140px] p-4 rounded-md border border-pink-300 focus:ring-[3px] focus:ring-pink-400/30 focus:border-pink-400 outline-none transition-all resize-none placeholder:text-muted-foreground text-[24px]"
                            placeholder="배송 시 요청사항을 적어주세요"
                            {...register("shippingInfo.deliveryMessage")}
                        />
                    </div>
                </div>
            </section>
        </Card>
    );
}