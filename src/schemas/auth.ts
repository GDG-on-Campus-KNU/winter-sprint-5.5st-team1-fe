import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@$!%*#?&])[A-Za-z\d~!@$!%*#?&]{8,}$/;

export const loginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const signupSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요."),
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 형식이 아닙니다."),
    password: z.string().regex(passwordRegex, "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type SignupFormInputs = z.infer<typeof signupSchema>;