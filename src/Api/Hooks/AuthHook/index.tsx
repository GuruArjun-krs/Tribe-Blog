import { useMutation } from "@tanstack/react-query"
import { LoginUsers, RegisterUsers } from "@/Api/Collections/Auth"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: { email: string, password: string }) => {
            return await LoginUsers(payload)
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: { name: string, email: string, password: string }) => {
            return await RegisterUsers(payload)
        }
    })
}