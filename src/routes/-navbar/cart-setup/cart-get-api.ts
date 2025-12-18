import { useAuthStore } from "@/store/auth-store";
import authAxiosInstance from "@/lib/auth-refresh-rotation";
import type { CartItemType } from "@/store/cart-store";


type CartApiResponseType = {
    status: "success" | "error" | "exception",
    results: {
        id: number,
        user: string,
        restaurant: string,
        total_quantity: number,
        total_items: number,
        total_price: number,
        c_items: CartItemType[],        
        restaurant_name: string,
        service_charges: {
            [key: string]: number, // services charges are variable (like rain charges won't come when not raining)
        },
        to_pay: number,
    } | undefined
}

const url = `restaurants/api/v1/cart/`;

export async function GetCartAPI(){

    const auth_data = useAuthStore.getState();

    if (!auth_data.verifySession()){
        throw new Error("Kindly Login to perform this action!!");
    }
    
    const response = await authAxiosInstance.get<CartApiResponseType>(url);
    // console.log("Ran api cart get: ", response.data);
    
    return response.data;

}