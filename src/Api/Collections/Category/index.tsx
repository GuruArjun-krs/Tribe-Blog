import api from "@/Api/middleware";

export const AddCategory = async (payload: any) => {
    const res = await api.post("/categories", payload);
    return res.data;
};

export const CategoryList = async () => {
    const res = await api.get("/categories");
    return res?.data;
};