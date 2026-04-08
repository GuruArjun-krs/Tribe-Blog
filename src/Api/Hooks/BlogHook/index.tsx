import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBlog, AddFavorite, BlogById, BloggerPostById, BlogList, DeleteBlog, MyBlogs, MyFavorites, UpdateBlog } from "@/Api/Collections/Blogs";
import { Platform } from "react-native";

export const useBlogList = () => {
    return useQuery({
        queryKey: ["BlogList"],
        queryFn: async () => {
            const response = await BlogList()
            return response;
        },
    })
}

export const useAddBlog = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const formData = new FormData();
            if (payload.image) {
                formData.append('image', {
                    uri: Platform.OS === 'android' ? payload.image.uri : payload.image.uri.replace('file://', ''),
                    type: payload.image.type,
                    name: payload.image.fileName,
                } as any);
            }
            formData.append('title', payload?.title)
            formData.append('category', payload?.category)
            formData.append('content', payload?.content)
            return await AddBlog(formData)
        }
    })
}

export const useEditBlog = () => {
    return useMutation({
        mutationFn: async ({ payload, id }: { payload: any, id: string }) => {
            const formData = new FormData();
            if (payload.image) {
                formData.append('image', {
                    uri: Platform.OS === 'android' ? payload.image.uri : payload.image.uri.replace('file://', ''),
                    type: payload.image.type,
                    name: payload.image.fileName,
                } as any);
            }
            formData.append('title', payload?.title);
            formData.append('category', payload?.category);
            formData.append('content', payload?.content);
            formData.append('isPublished', String(payload?.isPublished));
            return await UpdateBlog(formData, id);
        }
    });
};

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