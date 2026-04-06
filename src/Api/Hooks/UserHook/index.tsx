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