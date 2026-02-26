import { useState } from "react";
import MyInfo from "@/components/user/myInfo";
import MyCoupons from "@/components/user/myCounpons";
import MyOrders from "@/components/user/myOrders";
import { User, Ticket, Package } from "lucide-react";
import { useMyInfo } from "@/hooks/useMyPage";
import { Loading } from "@/components/loading";

type Tab = "orders" | "coupons" | "info";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "orders", label: "주문 내역", icon: <Package className="h-5 w-5" /> },
  { key: "coupons", label: "내 쿠폰함", icon: <Ticket className="h-5 w-5" /> },
  { key: "info", label: "내 정보", icon: <User className="h-5 w-5" /> },
];

export default function MyPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const { data: myInfo, isLoading } = useMyInfo();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 flex gap-6">
      <aside className="w-64 flex-shrink-0">
        <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col items-center gap-3 mb-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-200">
            <User className="h-10 w-10 text-pink-500" />
          </div>
          <p className="font-bold text-gray-500 text-[18px]">
            {isLoading ? "로딩 중..." : (myInfo?.name ?? "")}
          </p>
          <p className="text-[13px] text-gray-300">{myInfo?.email ?? ""}</p>
        </div>

        <nav className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex w-full items-center gap-3 px-6 py-4 text-[15px] font-semibold transition-colors border-b border-gray-100 last:border-none ${
                tab === key
                  ? "bg-pink-500 text-white"
                  : "text-gray-400 hover:bg-pink-200/30"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {tab === "orders" && <MyOrders />}
            {tab === "coupons" && <MyCoupons />}
            {tab === "info" && <MyInfo />}
          </>
        )}
      </main>
    </div>
  );
}
