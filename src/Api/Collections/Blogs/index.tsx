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

export const BlogById = async (id: string) => {
    const res = await api.get(`/posts/${id}`);
    return res?.data;
};

export const MyBlogs = async () => {
    const res = await api.get(`/posts/me`);
    return res?.data;
};

export const AddFavorite = async (id: any) => {
    const res = await api.put(`/posts/${id}/favorite`);
    return res.data;
};

export const DeleteBlog = async (id: any) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
};

export const MyFavorites = async () => {
    const res = await api.get(`/posts/favorites/me`);
    return res?.data;
};