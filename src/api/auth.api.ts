import instance from "@/lib/axios";
import { LoginFormInputs } from "@/schemas/auth";

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

export const loginApi = async (data: LoginFormInputs): Promise<LoginResponse> => {
    const response = await instance.post<LoginResponse>("/api/v1/auth/login", data);
    return response.data;
};