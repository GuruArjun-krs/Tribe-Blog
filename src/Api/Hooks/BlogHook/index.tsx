import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBlog, BlogById, BlogList, CategoryList, MyBlogs } from "@/Api/Collections/Blogs";

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

export const useBlogById = (id: string) => {
    return useQuery({
        queryKey: ["blogDetail"],
        queryFn: async () => {
            const response = await BlogById(id)
            return response;
        },
    })
}

export const useMyBlogs = () => {
    return useQuery({
        queryKey: ["myBlogs"],
        queryFn: async () => {
            const response = await MyBlogs()
            return response;
        },
    })
}