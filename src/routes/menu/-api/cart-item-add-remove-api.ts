import authAxiosInstance from "@/lib/auth-refresh-rotation";
import { useAuthStore } from "@/store/auth-store";


export type CartItemAddRemoveApi_BodyType = {
    restaurant_id: string,
    item_uuid: string,
    category: string,
    mode: "add" | "remove",
}

export type CartItemAddRemoveApi_Response = {
    id: number,
    item_uuid: string,
    category: string,
    quantity: number,
    cart: number,
}

const url = '/restaurants/api/v1/cart-items/';

export async function cartItemAddRemoveAPI(data: CartItemAddRemoveApi_BodyType){

    const {verifySession} = useAuthStore.getState();

    if (!verifySession()){
        throw new Error("Kindly Login to perform this action!!");
    }

    const response = await authAxiosInstance.post<CartItemAddRemoveApi_Response>(url, data);

    return response.data;
}