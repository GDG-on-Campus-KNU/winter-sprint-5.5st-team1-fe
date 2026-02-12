import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@$!%*#?&])[A-Za-z\d~!@$!%*#?&]{8,}$/;

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string | null>>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmailChecked, setIsEmailChecked] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: null }));
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "유효한 이메일 형식이 아닙니다." }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  }, [formData.email]);

  React.useEffect(() => {
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: null }));
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setErrors(prev => ({ ...prev, password: "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다." }));
    } else {
      setErrors(prev => ({ ...prev, password: null }));
    }
  }, [formData.password]);


  React.useEffect(() => {
    if (!formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (id === "email") setIsEmailChecked(false);
  };

const handleCheckEmail = async () => {
    if (errors.email || !formData.email) return;

    setIsLoading(true);
    try {
      // 테스트용 (중복 O/중복 X)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isDuplicated = false; 
          if (isDuplicated) { // 중복 O
            reject(new Error("이미 사용 중인 이메일입니다."));
          } else {
            resolve(true);
          }
        }, 800);
      });

      // 중복 X
        setIsEmailChecked(true);
        
        setErrors(prev => ({ ...prev, email: null }));

    } catch (error: unknown) {
      setIsEmailChecked(false); 
      const msg = error instanceof Error ? error.message : "중복 확인 오류";
      setErrors(prev => ({ ...prev, email: msg }));
    } finally {
      setIsLoading(false);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (Object.values(errors).some(v => v !== null)) return;
  if (!isEmailChecked || !formData.name) return;

  setIsLoading(true);

  try {
    // 테스트용
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 가입 성공 가정 -> 메인 페이지 이동
    navigate("/home"); 

  } catch (error) {
    console.error("회원가입 실패", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-[40px] font-bold tracking-tight text-gray-500">회원가입</h2>
          <p className="mt-1 text-[20px] text-gray-400">회원 정보를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[20px] mb-1">이름</Label>
            <Input id="name" placeholder="홍길동" value={formData.name} onChange={handleChange} className={cn("h-11 text-[18px] md:text-[18px]")}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[20px] mb-1">이메일</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn("h-11 text-[18px] md:text-[18px]", errors.email && "border-destructive")}
                />
              </div>
              <Button 
                type="button" 
                variant="outline"
                size="default"
                onClick={handleCheckEmail}
                disabled={!!errors.email || !formData.email || isEmailChecked}
              >
                {isEmailChecked ? "확인됨" : "중복 확인"}
                
              </Button>
            </div>
            {errors.email && <p className="text-base text-destructive">
              {errors.email}
            </p>}
            {isEmailChecked && !errors.email && <p className="text-base text-green-600">
              사용 가능한 이메일입니다.
            </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[20px] mb-1">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="영문+숫자+특수문자 8자 이상"
              value={formData.password}
              onChange={handleChange}
              className={cn("h-11 text-[18px] md:text-[18px]", errors.password && "border-destructive")}
            />
            {errors.password ? (
              <p className="text-base text-destructive">{errors.password}</p>
            ) : formData.password && (
              <p className="text-base text-green-600">안전한 비밀번호입니다.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[20px] mb-1">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={cn("h-11 text-[18px] md:text-[18px]", errors.confirmPassword && "border-destructive")}
            />
            {errors.confirmPassword && <p className="text-base text-destructive">{errors.confirmPassword}</p>}
          </div>

          <Button 
            className="w-full text-xl mt-4" 
            size="lg" 
            disabled={isLoading || Object.values(errors).some(v => v !== null) || !isEmailChecked || !formData.name}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "가입하기"}
          </Button>
          
          <div className="flex items-center justify-center mt-6 gap-x-2">
            <span className="text-base text-gray-500">이미 계정이 있으신가요?</span>
              <Button
                type="button"
                variant="link"
              className={cn("h-auto p-0 font-semibold text-base text-pink-500 hover:text-pink-500/80")}
                onClick={() => {
                  navigate("/login-page");
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