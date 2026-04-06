import api from "@/Api/middleware";

export const BlogList = async () => {
    const res = await api.get("/posts");
    return res?.data;
};

export const CategoryList = async () => {
    const res = await api.get("/categories");
    return res?.data;
};

export const AddBlog = async (payload: any) => {
    const res = await api.post("/posts", payload);
    return res.data;
};