import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { loginSchema, LoginFormInputs } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { loginApi, LoginResponse } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // 포커스를 잃을 때 유효성 검사
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setFormError(null);
    try {
      const response = await loginApi(data);

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        await useAuthStore.getState().hydrate();
        navigate("/");
      } else {
        setFormError(response.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.response?.data as LoginResponse;
        const errorMessage = errorData?.error?.message || errorData?.message || "아이디나 비밀번호를 다시 확인해주세요.";

        setFormError(errorMessage);
      } else {
        console.error("Login Error:", error);
        setFormError("서버와의 통신 중 문제가 발생했습니다.");
      }
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg text-card-foreground">

        <div className="text-center">
          <h2 className="mt-2 text-[40px] font-semibold">로그인</h2>
          <p className="mt-1 text-xl text-gray-300 font-medium">이메일과 비밀번호를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">

            <div className="relative text-left">
              <Label htmlFor="email" className="mb-2 block text-xl text-gray-500 font-medium">
                이메일
              </Label>

              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  disabled={isSubmitting}
                  className={cn(
                    "text-xl lg:text-xl h-11",
                    errors.email ? "border-destructive" : ""
                  )}
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="mt-1 block text-base text-destructive font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative text-left">
              <Label htmlFor="password" className="mb-2 block text-xl text-gray-500 font-medium">
                비밀번호
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className={cn("text-xl lg:text-xl h-11",
                    errors.password ? "border-destructive" : ""
                  )}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="mt-1 block text-base text-destructive font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {formError && (
            <div className="rounded-md bg-destructive/10 p-3 text-lg text-destructive text-center font-medium">
              {formError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center uppercase">
              <span className="bg-card px-2 text-base font-medium text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}