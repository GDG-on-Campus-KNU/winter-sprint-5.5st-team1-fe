import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@$!%*#?&])[A-Za-z\d~!@$!%*#?&]{8,}$/;
const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

export const loginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const signupSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요."),
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
    phone: z.string().regex(phoneRegex, "연락처는 하이픈(-)을 포함하여 입력해주세요. (예: 010-1234-5678)"),
    address: z.string().min(1, "주소를 입력해주세요."),
    password: z.string().regex(passwordRegex, "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type SignupFormInputs = z.infer<typeof signupSchema>;