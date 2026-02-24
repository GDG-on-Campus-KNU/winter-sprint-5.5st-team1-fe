import {
  Store,
  ShoppingCart,
  LogOut,
  CircleUserRound,
  ScrollText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cart.store";

type UserRole = "user" | "admin"; // 비로그인 상태일 경우 null

interface User {
  role: UserRole;
}

export default function Header() {
  //const user: User | null = null; // 비로그인 상태
  const user: User | null = { role: "user" }; // 일반 사용자 로그인 상태
  //const user: User | null = { role: "admin" }; // 관리자 로그인 상태
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="flex h-20 w-full items-center justify-between bg-pink-500 px-8 text-white">
      <div className="flex items-center gap-2 font-semibold text-[28px]">
        <Store className="w-8 h-8"></Store>
        전자상거래 데모
      </div>
      {!user && (
        <div className="flex items-center gap-8 font-medium text-[24px]">
          <button className="flex items-center">로그인</button>
          <button className="flex items-center">회원가입</button>
        </div>
      )}
      {user?.role === "user" && (
        <div className="flex items-center gap-6 font-medium text-[24px]">
          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart className="w-7 h-7" />
            장바구니
            {itemCount > 0 && (
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[18px] font-semibold text-pink-500 leading-none">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="flex items-center gap-2">
            <LogOut className="w-7 h-7"></LogOut>
            로그아웃
          </button>
          <button className="flex items-center gap-2">
            <CircleUserRound className="w-7 h-7"></CircleUserRound>
            마이페이지
          </button>
        </div>
      )}
      {user?.role === "admin" && (
        <div className="flex items-center gap-6 font-medium text-[24px]">
          <button className="flex items-center gap-2">
            <ScrollText className="w-7 h-7"></ScrollText>
            상품 관리
          </button>
          <button className="flex items-center gap-2">
            <LogOut className="w-7 h-7"></LogOut>
            로그아웃
          </button>
          <div className="flex items-center gap-2">
            <CircleUserRound className="w-7 h-7"></CircleUserRound>
            관리자
          </div>
        </div>
      )}
    </header>
  );
}
