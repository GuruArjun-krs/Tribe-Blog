import api from "@/Api/middleware";
import { BASE_URI } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BlogList = async () => {
    const res = await api.get("/posts");
    return res?.data;
};

export const AddBlog = async (payload: any) => {
    const token = await AsyncStorage.getItem('accessToken');
    return await fetch(`${BASE_URI}/posts`, {
        method: 'POST',
        body: payload,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(res => res.json());
};

export const UpdateBlog = async (payload: any, id: string) => {
    const token = await AsyncStorage.getItem('accessToken');
    return await fetch(`${BASE_URI}/posts/${id}`, {
        method: 'PUT',
        body: payload,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(res => res.json());
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

export const BloggerPostById = async (id: any) => {
    const res = await api.get(`/posts/user/${id}`);
    return res?.data;
};