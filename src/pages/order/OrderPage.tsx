import { useState, useMemo } from "react";
import { MOCK_COUPONS } from "@/mocks/data/coupons";
import { getAvailableCoupons } from "@/utils/coupon";
import { ShippingInfoCard } from "@/components/cards/order/shippingInfoCard";
import { CouponSelectionCard } from "@/components/cards/order/couponSelectionCard";
import { CouponCard } from "@/components/cards/couponCard";
import { OrderSummaryCard } from "@/components/cards/order/orderSummaryCard";
import { OrderItemList } from "@/components/cards/order/orderItemList";
import { MOCK_CART_ITEMS } from "@/mocks/data/cartItems";
import { X } from "lucide-react";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema, OrderFormType } from "@/schemas/orderForm";

function OrderPage() {
    const items = MOCK_CART_ITEMS;
    const shipping = 3000;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const methods = useForm<OrderFormType>({
        resolver: zodResolver(OrderFormSchema),
        mode: "onChange",
        defaultValues: {
            selectedCoupon: null,
            shippingInfo: {
                name: "",
                phone: "",
                address: "",
                detailAddress: "",
                deliveryMessage: "",
            },
        },
    });
    const selectedCoupon = useWatch({
        control: methods.control,
        name: "selectedCoupon",
    });
    const { isValid: isOrderValid } = methods.formState;

    const onSubmit = (data: OrderFormType) => {
        console.log("폼 검증 완료/최종 주문 데이터:", data);
    };
    const subtotal = useMemo(() =>
        items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    const availableSortedCoupons = useMemo(() => {
        const available = getAvailableCoupons(MOCK_COUPONS, subtotal);
        return [...available].sort((a, b) => a.id - b.id);
    }, [subtotal]);
    const discountAmount = selectedCoupon ? (subtotal * selectedCoupon.discountRate) / 100 : 0;
    const totalAmount = subtotal + shipping - discountAmount;

    return (
        <div className="w-full min-h-screen py-10 px-[120px]">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="w-full mx-auto space-y-10"
                >
                    <h1 className="text-[32px] font-semibold text-gray-500 ml-2 mb-10 text-left">
                        주문서 작성
                    </h1>
                    <div className="flex flex-row items-start gap-14 w-full">
                        <section className="flex-1 min-w-0 space-y-10" aria-label="주문 상세 정보 입력">
                            <CouponSelectionCard onOpenModal={() => setIsModalOpen(true)} />
                            <ShippingInfoCard />
                        </section>
                        <aside className="w-[470px] flex-shrink-0 flex flex-col gap-10 sticky top-10">
                            <OrderItemList items={items} />
                            <OrderSummaryCard
                                subtotal={subtotal}
                                shipping={shipping}
                                discount={discountAmount}
                                total={totalAmount}
                                isOrderValid={isOrderValid}
                            />
                        </aside>
                    </div>
                </form>
            </FormProvider>

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
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer -mt-2 -mr-2"
                            >
                                <X size={32} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="overflow-y-auto pr-6 custom-scrollbar flex-1">
                            {availableSortedCoupons.length > 0 ? (
                                <ul className="grid grid-cols-2 gap-8 p-0 m-0">
                                    {availableSortedCoupons.map((coupon) => (
                                        <button
                                            type="button"
                                            key={coupon.id}
                                            onClick={() => {
                                                methods.setValue("selectedCoupon", coupon, {
                                                    shouldValidate: true,
                                                    shouldDirty: true
                                                });
                                                setIsModalOpen(false);
                                            }}
                                        >
                                            <CouponCard
                                                coupon={coupon}
                                                isHighlighted={selectedCoupon?.id === coupon.id}
                                            />
                                        </button>
                                    ))}
                                </ul>
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