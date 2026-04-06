import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBlog, BlogList, CategoryList } from "@/Api/Collections/Blogs";

export const useBlogList = () => {
    return useQuery({
        queryKey: ["BlogList"],
        queryFn: async () => {
            const response = await BlogList()
            return response;
        },
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

export const useAddBlog = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            return await AddBlog(payload)
        }
    })
}