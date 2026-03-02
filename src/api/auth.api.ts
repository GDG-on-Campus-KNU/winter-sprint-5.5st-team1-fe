import instance from "@/lib/axios";
import { LoginFormInputs, SignupFormInputs } from "@/schemas/auth";

export interface LoginResponse {
    success: boolean;
    data?: {
        access_token: string;
        refresh_token: string;
        token_type: string;
    };
    message: string;
    error?: {
        code: string;
        message: string;
        field_errors?: { field: string; message: string; }[];
    };
    timestamp: string;
}

export interface SignupResponse {
    success: boolean;
    data?: Record<string, never>;
    message: string;
    error?: {
        code: string;
        message: string;
        field_errors?: { field: string; message: string; }[];
    };
    timestamp: string;
}

export const loginApi = async (data: LoginFormInputs) => {
    const response = await instance.post<LoginResponse>("/api/v1/auth/login", data);
    return response.data;
};

// 서버 요청 시 confirmPassword 제외하기
export type SignupRequestPayload = Omit<SignupFormInputs, "confirmPassword">;
export const signupApi = async (data: SignupRequestPayload) => {
    const response = await instance.post<SignupResponse>("/api/v1/auth/signup", data);
    return response.data;
};