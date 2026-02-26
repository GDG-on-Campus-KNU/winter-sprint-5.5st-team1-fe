import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Private({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

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

  return <>{children}</>;
}
