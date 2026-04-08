import { Platform } from "react-native";
import { BASE_URI } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserProfile, UserProfileUpdate } from "@/Api/Collections/User";

export const useUserProfile = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ["userProfile", id],
        queryFn: async () => {
            const response = await UserProfile({ id })
            return response;
        },
        enabled: !!id,
    })
}

export const useUserProfileUpdate = () => {
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
            return await UserProfileUpdate({ id, payload });
        }
    })
}

export const useUserProfileImageUpdate = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const formData = new FormData();
            const token = await AsyncStorage.getItem('accessToken');
            formData.append('image', {
                uri: Platform.OS === 'android'
                    ? payload.uri
                    : payload.uri.replace('file://', ''),
                type: payload.type,
                name: payload.fileName,
            } as any);
            return await fetch(`${BASE_URI}/users/profile-image`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }).then(res => res.json());
        }
    })
}