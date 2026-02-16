import * as React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { set } from "react-hook-form";

export default function OrderCompletePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const orderNumber = location.state?.orderNumber || "0000000000000"; // 주문 번호 없을 때 기본값 (테스트용)
    const { orderId } = useParams<{ orderId: string }>(); // URL에서 orderId 가져오기
    // const [orderData, setOrderData] = React.useState<{ orderNumber: string } | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        // 주문 번호가 아예 URL에 없는 경우
        if (!orderId) {
            alert("주문 정보가 만료되었거나 잘못된 접근입니다. 주문내역으로 이동합니다.");
            navigate("/mypage/orders", { replace: true });
            return;
        }

        // 서버에 요청을 보내는 비동기 함수
        const fetchOrderData = async () => {
            try {
                setIsLoading(true);

                // 실제 API 요청 (예시 URL)
                // const response = await fetch(`https://api.my-commerce.com/orders/${orderId}`);
                // if (!response.ok) {
                //     throw new Error("주문 정보를 가져오는 데 실패했습니다.");
                // }
                // const data = await response.json();

                // API가 없을 때를 위한 가짜 서버 지연 시간
                await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
                // const data = {
                //     orderNumber: orderId,
                //     totalAmount: 99000,
                //     items: [
                //         { id: 1, name: "베이직 코튼 셔츠", option: "화이트 / L", price: 29000, quantity: 1 },
                //         { id: 2, name: "와이드 핏 슬랙스", option: "블랙 / M", price: 35000, quantity: 2 },
                //     ]
                // };

                // setOrderData(data);
            } catch (error) {
                console.error("주문 정보를 가져오는 중 오류 발생:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId, navigate]);

    // 로딩 중일 때 보여줄 화면
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-pink-500" />
            </div>
        );
    }

    // 에러 발생 시 보여줄 화면
    if (isError || !orderData) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">주문 정보를 불러올 수 없습니다.</h2>
                <Button onClick={() => navigate("/mypage/orders")} variant="outline">주문 내역으로 이동</Button>
            </div>
        );
    }

    // 주문 번호 없을 때 처리 (새로고침 등)
    // React.useEffect(() => {
    //     if (!orderNumber) {
    //         alert("주문 정보가 만료되었거나 잘못된 접근입니다. 주문내역으로 이동합니다.");
    //         navigate("/mypage/orders", { replace: true }); // 주문 번호 없으면 주문내역으로 이동
    //     }
    // }, [orderNumber, navigate]);

    // if(!orderNumber) {
    //     return null; // 주문 번호 없으면 useEffect에서 리다이렉트하기 전까지 빈 화면 보여주기
    // }

    // 주문 번호가 있을 때 보여줄 화면
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
        
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-200">
            <CheckCircle2 className="h-14 w-14 text-pink-500" strokeWidth={2.5} />
        </div>

        <div className="mb-10 text-center">
            <h1 className="mb-4 text-[24px] font-bold text-gray-500 sm:text-[32px] md:text-[40px]">
            주문이 완료되었습니다!
            </h1>
                
            <div className="mb-6 rounded-xl bg-gray-100 px-6 py-3">
                <span className="mr-3 text-[20px] text-gray-400 sm:text-[22px] md:text-[24px]">주문 번호:</span>
                <span className="text-[20px] font-bold tracking-wider text-pink-500 sm:text-[22px] md:text-[24px]">{orderNumber}</span>
            </div>
                
            <p className="mt-10 mb-1 text-[20px] text-gray-400 leading-relaxed sm:text-[22px] md:text-[24px]">
            고객님의 주문이 성공적으로 처리되었습니다.
            <br />
            주문 내역은 마이페이지에서 확인하실 수 있습니다.
            </p>
        </div>

        <div className="flex w-full max-w-md flex-col gap-7 sm:flex-row">
            <Button
            type="button"
            variant="outline"
            className="h-15 flex-1 text-[20px] sm:text-[22px] md:text-[24px] border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            onClick={() => navigate("/product")}
            >
            쇼핑 계속하기
            </Button>

            <Button
            type="button"
            className="h-15 flex-1 text-[20px] sm:text-[22px] md:text-[24px] bg-pink-500 text-pink-100 hover:bg-pink-400"
            onClick={() => navigate("/mypage/orders")} // 주문 내역 경로 넣기
            >
            주문 내역 보기
            </Button>
        </div>
        
        </div>
    );
}