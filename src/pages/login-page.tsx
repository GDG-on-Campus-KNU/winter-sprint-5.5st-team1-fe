import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const navigate = useNavigate();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    } else {
      setEmailError(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!emailRegex.test(email)) {
        setEmailError("유효한 이메일 형식이 아닙니다.");
        return;
    }
    if (!password) {
        setFormError("비밀번호를 입력해주세요.");
        return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (password === "1234") {
            resolve({ token: "abc-123-token-sample" });
          } else {
            reject(new Error("이메일 또는 비밀번호가 일치하지 않습니다."));
          }
        }, 1500);
      });

      // 실제 로그인 API 연동 전까지 사용하는 임시 토큰
      const fakeToken = "abc-123-token-sample";
      localStorage.setItem("authToken", fakeToken);
      navigate("/home");

      
    } catch (error) {
      const err = error as Error;
      setFormError(err.message || "로그인 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg text-card-foreground">
        
        <div className="text-center">
          <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">로그인</h2>
          <p className="mt-2 text-sm text-muted-foreground">이메일과 비밀번호를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            
            <div className="relative text-left">
              <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                이메일
              </Label>
              
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  disabled={isLoading}
                  className={cn(
                    emailError ? "border-destructive" : ""
                  )}
                />
              </div>

              {emailError && (
                <p className="mt-1.5 block text-sm text-destructive font-medium">
                  {emailError}
                </p>
              )}
            </div>

            <div className="text-left">
              <Label htmlFor="password" className="mb-2 block text-sm">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {formError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center font-medium">
              {formError}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center uppercase">
              <span className="bg-card px-2 text-sm font-medium text-muted-foreground">
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
              // TODO: 회원가입 페이지로 이동
            }}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}