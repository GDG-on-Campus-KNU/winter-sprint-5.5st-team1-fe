import { User, Ticket, Package } from "lucide-react";
import { useMyInfo } from "@/hooks/useMyPage";
import { Loading } from "@/components/loading";
import { Tab } from "@/components/ui/tab";
import MyInfo from "@/components/user/myInfo";
import MyCoupons from "@/components/user/myCounpons";
import MyOrders from "@/components/user/myOrders";

export default function MyPage() {
  const { data: myInfo, isLoading } = useMyInfo();

  return (
    <Tab.Root queryKey="tab" defaultActiveTab="orders">
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

          <Tab.NavBar>
            <Tab.NavItem menu="orders" icon={<Package className="h-5 w-5" />}>
              주문 내역
            </Tab.NavItem>
            <Tab.NavItem menu="coupons" icon={<Ticket className="h-5 w-5" />}>
              내 쿠폰함
            </Tab.NavItem>
            <Tab.NavItem menu="info" icon={<User className="h-5 w-5" />}>
              내 정보
            </Tab.NavItem>
          </Tab.NavBar>
        </aside>

        <main className="flex-1 min-w-0">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Tab.Panel menu="orders">
                <MyOrders />
              </Tab.Panel>
              <Tab.Panel menu="coupons">
                <MyCoupons />
              </Tab.Panel>
              <Tab.Panel menu="info">
                <MyInfo />
              </Tab.Panel>
            </>
          )}
        </main>
      </div>
    </Tab.Root>
  );
}
