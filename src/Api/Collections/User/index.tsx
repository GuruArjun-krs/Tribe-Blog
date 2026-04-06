import api from "@/Api/middleware";

export const UserProfile = async ({ id }: { id: string }) => {
    const res = await api.get(`/users/${id}`);
    return res?.data;
};

export const UserProfileUpdate = async ({ id, payload }: { id: string, payload: any }) => {
    const res = await api.put(`/users/${id}`, payload);
    return res?.data;
};