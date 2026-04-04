import api from "@/Api/middleware";

export const LoginUsers = async (payload: { email: string, password: string }) => {
    const res = await api.post("/users/login", payload);
    return res.data;
};