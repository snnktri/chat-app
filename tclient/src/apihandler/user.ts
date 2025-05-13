import { api } from "../utils/axiosInstance";
import { RegisterData, ResponseData } from "../type/auth.typs";
import { AxiosError } from "axios";

export const register = async (user: RegisterData): Promise<void> => {
    try {
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        // Optional: Log form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        console.log("heello")

        const res = await api.post<ResponseData>("/user/register", formData);
        console.log(res);
    } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(err.response?.data?.message || "Registration failed.");
    }
};
