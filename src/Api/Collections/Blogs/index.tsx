import api from "@/Api/middleware";

export const BlogList = async () => {
    const res = await api.get("/posts");
    return res?.data;
};