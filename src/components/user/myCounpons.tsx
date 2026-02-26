import { useState } from "react";
import { useMyCoupons } from "@/hooks/useMyPage";
import { Ticket } from "lucide-react";
import { Loading } from "@/components/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MyCoupons() {
  const { data: coupons = [], isLoading } = useMyCoupons();
  const [tab, setTab] = useState<"available" | "used">("available");
  const [couponCode, setCouponCode] = useState("");

  const filtered = coupons.filter((c) =>
    tab === "available" ? c.available : !c.available,
  );

  const handleRegisterCoupon = () => {
    if (!couponCode.trim()) return;
    // TODO: API 연결
    console.log("등록할 쿠폰 코드:", couponCode);
    setCouponCode("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-[24px] font-bold text-gray-500 mb-6">내 쿠폰함</h2>

      <div className="mb-6 flex gap-2">
        <Input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegisterCoupon()}
          placeholder="쿠폰 번호를 입력하세요"
          className="h-11 rounded-xl text-[14px]"
        />
        <Button
          onClick={handleRegisterCoupon}
          disabled={!couponCode.trim()}
          size="default"
          className="rounded-xl text-[14px]"
        >
          등록
        </Button>
      </div>

      <div className="mb-4 flex rounded-2xl bg-gray-100 p-1">
        {(["available", "used"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-xl py-2 text-[15px] font-semibold transition-colors ${
              tab === t ? "bg-white text-pink-500 shadow-sm" : "text-gray-300"
            }`}
          >
            {t === "available" ? "사용 가능" : "사용 완료"}
            <span className="ml-1 text-[13px]">
              (
              {coupons.filter((c) =>
                t === "available" ? c.available : !c.available,
              ).length}
              )
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-gray-300">
          <Ticket className="h-12 w-12" />
          <p>
            {tab === "available"
              ? "사용 가능한 쿠폰이 없어요"
              : "사용한 쿠폰이 없어요"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((coupon) => (
            <div
              key={coupon.user_coupon_id}
              className={`rounded-2xl border-2 bg-white p-4 ${
                coupon.available
                  ? "border-pink-300"
                  : "border-gray-100 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-500 text-[16px]">
                    {coupon.coupon_name}
                  </p>
                  <p className="mt-1 text-[13px] text-gray-300">
                    {coupon.min_order_price.toLocaleString()}원 이상 주문 시
                  </p>
                </div>
                <span className="rounded-xl bg-pink-200 px-3 py-1 text-[18px] font-bold text-pink-500">
                  {coupon.coupon_type === "PERCENTAGE"
                    ? `${coupon.discount_value}%`
                    : `${coupon.discount_value.toLocaleString()}원`}
                </span>
              </div>
              <p className="mt-3 text-[12px] text-gray-300">
                만료일:{" "}
                {new Date(coupon.expired_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}