import * as React from "react";
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
  const [isEmailChecked, setIsEmailChecked] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const emailValue = useWatch({
    control,
    name: "email",
  })
  const passwordValue = useWatch({
    control,
    name: "password",
  });

  React.useEffect(() => {
    setIsEmailChecked(false);
  }, [emailValue]);

  const handleCheckEmail = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid || !emailValue) return;

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isDuplicated = false;
          if (isDuplicated) {
            reject(new Error("이미 사용 중인 이메일입니다."));
          } else {
            resolve(true);
          }
        }, 800);
      });

      setIsEmailChecked(true);
      clearErrors("email");
    } catch (error) {
      setIsEmailChecked(false);
      const msg = error instanceof Error ? error.message : "중복 확인 오류";
      setError("email", { type: "manual", message: msg });
    }
  };

  const onSubmit = async (data: SignupFormInputs) => {
    if (!isEmailChecked) return;

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
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-lg border border-gray-100 text-card-foreground">
        <div className="text-center">
          <h2 className="text-[40px] font-semibold tracking-tight">회원가입</h2>
          <p className="mt-1 text-[20px] font-medium text-muted-foreground">회원 정보를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[20px] mb-1 font-medium">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              className={cn("h-11 text-[18px] md:text-[18px]", errors.name && "border-destructive")}
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors.name && <p className="text-base text-destructive font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[20px] mb-1">이메일</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  className={cn("h-11 text-[20px] md:text-[20px]", errors.email && "border-destructive")}
                  disabled={isSubmitting}
                  {...register("email")}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={handleCheckEmail}
                disabled={!!errors.email || !emailValue || isEmailChecked || isSubmitting}
              >
                {isEmailChecked ? "확인됨" : "중복 확인"}
              </Button>
            </div>
            {errors.email && <p className="text-base text-destructive">{errors.email.message}</p>}
            {isEmailChecked && !errors.email && <p className="text-base text-green-600">사용 가능한 이메일입니다.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[20px] mb-1">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="영문+숫자+특수문자 8자 이상"
              className={cn("h-11 text-[20px] md:text-[20px]", errors.password && "border-destructive")}
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
              className={cn("h-11 text-[20px] md:text-[20px]", errors.confirmPassword && "border-destructive")}
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-base text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            className="w-full text-xl mt-4"
            size="lg"
            disabled={isSubmitting || !isValid || !isEmailChecked}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "가입 처리 중..." : "가입하기"}
          </Button>

          <div className="flex items-center justify-center mt-6 gap-x-2">
            <span className="text-base text-gray-500 text-[18px]">이미 계정이 있으신가요?</span>
            <Button
              type="button"
              variant="link"
              className={cn("h-auto p-0 font-semibold text-base text-pink-500 hover:text-pink-500/80 text-[18px]")}
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