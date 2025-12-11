import authAxiosInstance from "@/lib/auth-refresh-rotation";
import { useMutation } from "@tanstack/react-query";

type ClearCartResponseType = {
    status: "success" | "error",
    message: string,
}

async function clearCartApi(){
    const response = await authAxiosInstance.delete<ClearCartResponseType>("/restaurants/api/v1/cart/");
    return response.data;
}


export function useCartDeleteQuery(){
    return useMutation({
        mutationFn: clearCartApi,
        gcTime: 0,
        onSuccess: () => {
            
            // a refresh
            const location = window.location.href
            window.location.href = location;
        }
    })
}