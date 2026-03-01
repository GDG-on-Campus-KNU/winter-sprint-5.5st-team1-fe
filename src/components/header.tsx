import {
  Store,
  ShoppingCart,
  LogOut,
  CircleUserRound,
  ScrollText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cart.store";

type UserRole = "user" | "admin";

interface User {
  role: UserRole;
}

export default function Header() {
  const user: User | null = { role: "user" };
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="flex h-20 w-full items-center justify-between bg-pink-500 px-8 text-white">
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold text-[28px]"
      >
        <Store className="w-8 h-8" />
        전자상거래 데모
      </Link>

      {!user && (
        <nav
          aria-label="비로그인 메뉴"
          className="flex items-center gap-8 font-medium text-[24px]"
        >
          <Link to="/login" className="flex items-center">
            로그인
          </Link>
          <Link to="/signup" className="flex items-center">
            회원가입
          </Link>
        </nav>
      )}

      {user?.role === "user" && (
        <nav
          aria-label="사용자 메뉴"
          className="flex items-center gap-6 font-medium text-[24px]"
        >
          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart className="w-7 h-7" />
            장바구니
            {itemCount > 0 && (
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[18px] font-semibold text-pink-500 leading-none">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-7 h-7" />
            로그아웃
          </button>
          <Link to="/mypage" className="flex items-center gap-2">
            <CircleUserRound className="w-7 h-7" />
            마이페이지
          </Link>
        </nav>
      )}

      {user?.role === "admin" && (
        <nav
          aria-label="관리자 메뉴"
          className="flex items-center gap-6 font-medium text-[24px]"
        >
          <button className="flex items-center gap-2">
            <ScrollText className="w-7 h-7" />
            상품 관리
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-7 h-7" />
            로그아웃
          </button>
          <div className="flex items-center gap-2">
            <CircleUserRound className="w-7 h-7" />
            관리자
          </div>
        </nav>
      )}
    </header>
  );
}
