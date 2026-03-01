import { useNavigate } from "react-router-dom";
import { Lock, ShieldX } from "lucide-react";

type Role = "user" | "admin";

interface AuthGuardProps {
  children: React.ReactNode;
  role?: Role;
  fallback?: React.ReactNode;
}

export default function Private({
  children,
  role = "user",
  fallback,
}: AuthGuardProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-gray-300">
        <Lock className="h-24 w-24 text-pink-300" />
        <p className="text-[28px] font-bold text-gray-500">
          로그인이 필요한 페이지입니다
        </p>
        <p className="text-[18px]">로그인 후 이용해주세요</p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-2xl bg-pink-500 px-12 py-4 text-[18px] text-white font-semibold hover:bg-pink-400 transition-colors"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  if (role === "admin") {
    const userRole = parseTokenRole(token);
    if (userRole !== "ADMIN") {
      if (fallback) return <>{fallback}</>;
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-gray-300">
          <ShieldX className="h-24 w-24 text-pink-300" />
          <p className="text-[28px] font-bold text-gray-500">
            접근 권한이 없습니다
          </p>
          <p className="text-[18px]">관리자 전용 페이지입니다</p>
          <button
            onClick={() => navigate("/")}
            className="rounded-2xl bg-pink-500 px-12 py-4 text-[18px] text-white font-semibold hover:bg-pink-400 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      );
    }
  }

  return <>{children}</>;
}

function parseTokenRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}
