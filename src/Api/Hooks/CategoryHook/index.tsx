import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCategory, CategoryList } from "@/Api/Collections/Category";

export const useAddCategory = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            return await AddCategory(payload)
        }
    })
}

export const useCategoryList = () => {
    return useQuery({
        queryKey: ["CategoryList"],
        queryFn: async () => {
            const response = await CategoryList()
            return response;
        },
    })
}