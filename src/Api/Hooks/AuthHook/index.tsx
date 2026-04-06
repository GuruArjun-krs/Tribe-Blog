import { useMutation } from "@tanstack/react-query"
import { LoginUsers } from "@/Api/Collections/Auth"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: { email: string, password: string }) => {
            return await LoginUsers(payload)
        }
    })
}