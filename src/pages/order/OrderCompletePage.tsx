import * as React from "react";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { OrderCompleteListCard, OrderCompleteData } from "@/components/cards/orderCompleteListCard";

export default function OrderCompletePage() {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const [orderData, setOrderData] = React.useState<OrderCompleteData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        // 주문 번호가 URL에 없는 경우
        if (!orderId) {
            alert("주문 정보가 만료되었거나 잘못된 접근입니다. 주문내역으로 이동합니다.");
            navigate("/mypage/orders", { replace: true });
            return;
        }

        // 서버 요청 보내기
        const fetchOrderData = async () => {
            try {
                setIsLoading(true);

                // 실제 API 요청 예시
                // const response = await axios.get(`https://api.my-commerce.com/orders/${orderId}`);
                // setOrderData(response.data);

                // 로딩 스피너 테스트용 1초 지연
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // 테스트용 데이터
                const data: OrderCompleteData = {
                    orderNumber: orderId,
                    status: "결제완료",
                    orderDate: "2026년 2월 12일",
                    address: "대구광역시 북구 대학로 80 (IT대학5호관)",
                    recipient: "홍길동",
                    phone: "010-1234-5678",
                    deliveryMessage: "문 앞에 놔주세요.",
                    items: [
                        { name: "게이밍 키보드", quantity: 1 },
                        { name: "무선 게이밍 마우스", quantity: 2 },
                        { name: "장패드", quantity: 5 }
                    ],
                    totalPrice: 245000
                };
                setOrderData(data);

            } catch (error) {
                console.error("주문 정보 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId, navigate]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loading />
            </div>
        );
    }

    if (isError || !orderData) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">주문 정보를 불러올 수 없습니다.</h2>
                <Button onClick={() => navigate("/mypage/orders")} variant="outline">주문 내역으로 이동</Button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-15">
        
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-200">
                <CheckCircle2 className="h-14 w-14 text-pink-500" strokeWidth={2.5} />
            </div>

            <div className="mb-10 text-center">
                <h1 className="mb-4 text-[40px] font-bold text-gray-500">
                    주문이 완료되었습니다!
                </h1>
                
                <p className="mt-5 text-xl text-gray-400 leading-relaxed">
                    고객님의 주문이 성공적으로 처리되었습니다.
                    <br />
                    주문 내역은 마이페이지에서 확인하실 수 있습니다.
                </p> 
            </div>

            <div className="flex w-full justify-center mb-10">
                <OrderCompleteListCard order={orderData} />
            </div>

            <div className="flex w-full max-w-md flex-col gap-5 sm:flex-row sm:gap-10">
                <Button
                    type="button"
                    className="h-15 flex-1 text-xl bg-pink-500 text-pink-100 hover:bg-pink-400"
                    onClick={() => navigate("/product")}
                >
                쇼핑 계속하기
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="h-15 flex-1 text-xl border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => navigate("/mypage/orders")} // 주문 내역 경로 넣기
                >
                주문 내역 보기
                </Button>
            </div>

        </div>
    );
}