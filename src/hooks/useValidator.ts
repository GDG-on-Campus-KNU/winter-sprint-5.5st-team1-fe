import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@$!%*#?&])[A-Za-z\d~!@$!%*#?&]{8,}$/;

export const useValidator = () => {
    const [errors, setErrors] = useState<Record<string, string | null>>({
        email: null,
        password: null,
        confirmPassword: null,
    });

    const validate = (id: string, value: string, passwordValue?: string) => {
        let errorMessage: string | null = null;

        switch (id) {
            case "email":
                if (value && !emailRegex.test(value)) {
                    errorMessage = "유효한 이메일 형식이 아닙니다.";
                }
                break;

            case "password":
                if (value && !passwordRegex.test(value)) {
                    errorMessage = "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.";
                }
                break;

            case "confirmPassword":
                if (value && passwordValue && value !== passwordValue) {
                    errorMessage = "비밀번호가 일치하지 않습니다.";
                }
                break;
        }

        setErrors((prev) => ({ ...prev, [id]: errorMessage }));
    };

    return { errors, validate, setErrors };
};