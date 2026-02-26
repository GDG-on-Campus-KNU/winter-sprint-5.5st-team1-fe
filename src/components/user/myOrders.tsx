import { useMyOrders } from "@/hooks/useMyPage";
import { useQueryState } from "nuqs";
import { Package } from "lucide-react";
import { Loading } from "@/components/loading";

const PERIOD_OPTIONS = [
  { label: "1개월", value: "1" },
  { label: "3개월", value: "3" },
  { label: "6개월", value: "6" },
  { label: "12개월", value: "12" },
] as const;

const ORDER_STATUS_MAP: Record<string, string> = {
  PENDING: "주문 대기",
  CONFIRMED: "주문 확정",
  DELIVERED: "배송 완료",
  CANCELLED: "취소됨",
};

const ORDER_STATUS_COLOR: Record<string, string> = {
  PENDING: "text-yellow",
  CONFIRMED: "text-blue",
  DELIVERED: "text-pink-500",
  CANCELLED: "text-red",
};

export default function MyOrders() {
  const [period, setPeriod] = useQueryState("period", { defaultValue: "1" });
  const { data, isLoading } = useMyOrders({
    period: period as "1" | "3" | "6" | "12",
  });

  return (
    <div>
      <h2 className="text-[24px] font-bold text-gray-500 mb-6">주문 내역</h2>

      <div className="mb-4 flex gap-2">
        {PERIOD_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setPeriod(value)}
            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              period === value
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-300 border border-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading && <Loading />}

      {!isLoading && data?.empty && (
        <div className="flex flex-col items-center gap-2 py-20 text-gray-300">
          <Package className="h-12 w-12" />
          <p>주문 내역이 없어요</p>
        </div>
      )}

      {!isLoading && !data?.empty && (
        <div className="flex flex-col gap-3">
          {data?.content.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-gray-300">
                  {new Date(order.created_at).toLocaleDateString("ko-KR")}
                </span>
                <span
                  className={`text-[14px] font-bold ${ORDER_STATUS_COLOR[order.order_status]}`}
                >
                  {ORDER_STATUS_MAP[order.order_status]}
                </span>
              </div>
              <p className="text-[15px] font-semibold text-gray-500 mb-3">
                상품 {order.item_count}개
              </p>
              <div className="flex flex-col gap-1 text-[13px] text-gray-300 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>상품금액</span>
                  <span>{order.total_product_price.toLocaleString()}원</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-blue">
                    <span>할인</span>
                    <span>-{order.discount_amount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>+{order.delivery_fee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between font-bold text-[15px] text-gray-500 mt-1">
                  <span>최종 결제금액</span>
                  <span className="text-pink-500">
                    {order.final_price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}