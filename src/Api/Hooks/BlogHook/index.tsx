import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBlog, AddFavorite, BlogById, BloggerPostById, BlogList, CategoryList, DeleteBlog, MyBlogs, MyFavorites } from "@/Api/Collections/Blogs";

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

export const useAddFavorite = () => {
    return useMutation({
        mutationFn: async (id: any) => {
            return await AddFavorite(id)
        }
    })
}

export const useDeleteBlog = () => {
    return useMutation({
        mutationFn: async (id: any) => {
            return await DeleteBlog(id)
        }
    })
}

export const useMyFavorites = () => {
    return useQuery({
        queryKey: ["myFavorites"],
        queryFn: async () => {
            const response = await MyFavorites()
            return response;
        },
    })
}

export const useBloggerBlogById = (id: string) => {
    return useQuery({
        queryKey: ["blogDetailById"],
        queryFn: async () => {
            const response = await BloggerPostById(id)
            return response;
        },
    })
}