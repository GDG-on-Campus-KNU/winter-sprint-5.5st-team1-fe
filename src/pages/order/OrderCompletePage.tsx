import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { OrderCompleteListCard} from "@/components/cards/order/orderCompleteListCard";
import { fetchOrderData } from "@api/order.api";

export default function OrderCompletePage() {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();

    React.useEffect(() => {
        if (!orderId) {
            alert("주문 정보가 만료되었거나 잘못된 접근입니다. 주문내역으로 이동합니다.");
            navigate("/mypage", { replace: true });
            return;
        }
    }, [orderId, navigate]);

    const {
        data: orderData,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["orderComplete", orderId],
        queryFn: () => fetchOrderData(orderId as string),
        enabled: !!orderId,
    })

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
                <h2 className="text-2xl font-bold text-gray-500 mb-7">주문 정보를 불러올 수 없습니다.</h2>
                <Button onClick={() => navigate("/mypage/orders")} variant="outline">주문 내역으로 이동</Button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-15">

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
                    className="h-15 flex-1 text-xl"
                    onClick={() => navigate("/")}
                >
                    쇼핑 계속하기
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="h-15 flex-1 text-xl"
                    onClick={() => navigate("/mypage")} // 주문 내역 경로 넣기
                >
                    주문 내역 보기
                </Button>
            </div>

        </div>
    );
}