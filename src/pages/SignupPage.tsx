import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormInputs } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("가입 성공 데이터:", data);
      navigate("/home");

    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl space-y-8 rounded-xl bg-white p-8 shadow-lg border border-gray-100 text-card-foreground">
        <div className="text-center">
          <h2 className="text-[40px] font-semibold tracking-tight">회원가입</h2>
          <p className="mt-1 text-xl text-gray-300 font-medium">회원 정보를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xl mb-2 font-medium">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              className={cn("h-11 text-xl lg:text-xl", errors.name && "border-destructive")}
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors.name && <p className="text-base text-destructive font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xl mb-2">이메일</Label>
              <div className="relative flex-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  className={cn("h-11 text-xl lg:text-xl", errors.email && "border-destructive")}
                  disabled={isSubmitting}
                  {...register("email")}
                />
              </div>
            {errors.email && <p className="text-base text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xl mb-2">연락처</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              className={cn("h-11 text-xl lg:text-xl", errors.phone && "border-destructive")}
              disabled={isSubmitting}
              {...register("phone")}
            />
            {errors.phone && <p className="text-base text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-xl mb-2">주소</Label>
            <Input
              id="address"
              type="text"
              placeholder="서울특별시 강남구 테헤란로 123"
              className={cn("h-11 text-xl lg:text-xl", errors.address && "border-destructive")}
              disabled={isSubmitting}
              {...register("address")}
            />
            {errors.address && <p className="text-base text-destructive">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xl mb-2">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="영문+숫자+특수문자 8자 이상"
              className={cn("h-11 text-xl lg:text-xl", errors.password && "border-destructive")}
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-base text-destructive">{errors.password.message}</p>
            ) : (
              passwordValue && !errors.password && (<p className="text-base text-green-600">안전한 비밀번호입니다.</p>)
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[20px] mb-1">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              className={cn("h-11 text-xl lg:text-xl", errors.confirmPassword && "border-destructive")}
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-base text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            className="w-full text-xl mt-4"
            size="lg"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "가입 처리 중..." : "가입하기"}
          </Button>

          <div className="flex items-center justify-center mt-4 mb-3 gap-x-2">
            <span className="text-base text-gray-500 text-lg">이미 계정이 있으신가요?</span>
            <Button
              type="button"
              variant="link"
              className={cn("h-auto p-0 font-semibold text-lg text-pink-500 hover:text-pink-500/80")}
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인하기
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}