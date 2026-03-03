import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvailableCoupons } from "@/utils/coupon";
import { ShippingInfoCard } from "@/components/cards/order/shippingInfoCard";
import { CouponSelectionCard } from "@/components/cards/order/couponSelectionCard";
import { CouponCard } from "@/components/cards/couponCard";
import { OrderSummaryCard } from "@/components/cards/order/orderSummaryCard";
import { OrderItemList } from "@/components/cards/order/orderItemList";
import { X } from "lucide-react";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema, OrderFormType } from "@/schemas/orderForm";
import { Coupon } from "@/types/coupon";
import { CartItem } from "@/stores/cart.store";
import { fetchAvailableCouponsAPI, createOrderAPI, deleteCartItemsAPI } from "@/api/order.api";
import { isAxiosError } from "axios";

interface BackendCoupon {
    user_coupon_id: number;
    coupon_name: string;
    min_order_price: number;
    discount_value: number;
    coupon_type: string;
    expired_at: string;
    used_at: string | null;
    available: boolean;
    expires_in_days: number;
}

function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const items = useMemo(() => {
        return (location.state?.selectedItems as CartItem[]) || [];
    }, [location.state]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userCoupons, setUserCoupons] = useState<Coupon[]>([]);

    const isDirectBuy = location.state?.isDirectBuy || false;
    
    // 비정상 접근 차단

    useEffect(() => {
        const loadCoupons = async () => {
            try {
                const res = await fetchAvailableCouponsAPI();
                if (res.success) {
                    const mappedCoupons = res.data.map((c: BackendCoupon) => ({
                        id: c.user_coupon_id,
                        title: c.coupon_name,
                        discountRate: c.discount_value,
                        minOrderPrice: c.min_order_price,
                        expiryDate: c.expired_at.split("T")[0],
                        couponType: c.coupon_type,
                        available: c.available,
                    }));
                    setUserCoupons(mappedCoupons);
                }
            } catch (error) {
                console.error("쿠폰을 불러오는 데 실패했습니다.", error);
            }
        };
        loadCoupons();
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        };
    }, [isModalOpen]);

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

    const selectedCoupon = useWatch({ control: methods.control, name: "selectedCoupon" });
    const { isValid: isOrderValid } = methods.formState;

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    const shipping = subtotal >= 30000 ? 0 : 3000;

    const availableSortedCoupons = useMemo(() => {
        const available = getAvailableCoupons(userCoupons, subtotal);
        return [...available].sort((a, b) => a.id - b.id);
    }, [userCoupons, subtotal]);

    const discountAmount = selectedCoupon
        ? selectedCoupon.couponType === "PERCENTAGE"
            ? (subtotal * selectedCoupon.discountRate) / 100 // 퍼센트
            : selectedCoupon.discountRate // 고정 금액
        : 0;
    const totalAmount = subtotal + shipping - discountAmount;

    const onSubmit = async (data: OrderFormType) => {
        try {
            const orderPayload = {
                items: items.map((item) => ({
                    product_id: item.productId,
                    quantity: item.quantity
                })),
                user_coupon_id: data.selectedCoupon ? data.selectedCoupon.id : null,
                recipient_name: data.shippingInfo.name,
                recipient_phone: data.shippingInfo.phone,
                delivery_address: data.shippingInfo.address,
                delivery_detail_address: data.shippingInfo.detailAddress,
                delivery_message: data.shippingInfo.deliveryMessage,
            };

            const orderRes = await createOrderAPI(orderPayload);

            if (orderRes.success) {
                const itemIds = items.map(item => item.productId);
                await deleteCartItemsAPI(itemIds);

                if (!isDirectBuy) {
                    const itemIds = items.map(item => item.productId);
                    await deleteCartItemsAPI(itemIds);
                }

                alert("주문이 성공적으로 완료되었습니다! 🎉");
                const mappedOrderData = {
                    orderNumber: String(orderRes.data.order.id),
                    status: "결제완료",
                    // 날짜 형식을 '2026년 3월 3일' 형태로 변환 (원하는 포맷에 맞춰 수정 가능)
                    orderDate: new Date(orderRes.data.order.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
                    address: `${data.shippingInfo.address} ${data.shippingInfo.detailAddress}`,
                    recipient: data.shippingInfo.name,
                    phone: data.shippingInfo.phone,
                    deliveryMessage: data.shippingInfo.deliveryMessage,
                    // order_items 배열을 순회하며 필요한 데이터만 추출
                    items: orderRes.data.order_items.map((item: { product_name: string; quantity: number }) => ({
                        name: item.product_name,
                        quantity: item.quantity
                    })),
                    totalPrice: orderRes.data.order.final_price,
                };
                navigate(`/order/complete/${orderRes.data.order.id}`, {
                    state: { orderResult: mappedOrderData }, // 💡 조립된 데이터를 넘겨줍니다
                    replace: true
                });
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                console.error("주문 생성 실패 (백엔드 상세 에러):", error.response?.data);
            } else {
                console.error("주문 생성 실패 (알 수 없는 에러):", error);
            }
            alert("주문 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
        }
    };

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

            {isModalOpen && createPortal(
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
                </div>,
                document.getElementById("portal-root") as HTMLElement
            )}
        </div>
    );
}

export default OrderPage;