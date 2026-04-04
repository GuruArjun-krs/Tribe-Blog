import { useQuery } from "@tanstack/react-query";
import { BlogList } from "@/Api/Collections/Blogs";

export const useBlogList = () => {
    return useQuery({
        queryKey: ["BlogList"],
        queryFn: async () => {
            const response = await BlogList()
            return response;
        },
    })
}