import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartItemAddRemoveAPI } from "../-api/cart-item-add-remove-api";
import { useCartStore } from "@/store/cart-store";
import axios from "axios";
import { getCartQueryKey } from "@/routes/-navbar/cart-setup/cart-get-query";
import { useAuthStore } from "@/store/auth-store";


export function useCartItemQuery(currentRestId: string){
    const {clearCart, restaurant_id: prevRestId} = useCartStore();
    const {user} = useAuthStore(state => state);

    const queryClient = useQueryClient();
    const cartQueryKey = getCartQueryKey(user?.id);
    
    const query = useMutation({
        mutationFn: cartItemAddRemoveAPI,
        gcTime: 0,
        onSuccess: (data) => {
            if (currentRestId != prevRestId){
                clearCart();
                console.log("Cart item is cleared");
            }

            // FIX: Instead of refetching useCartQuery() each time, i just invalidate its query key, so that at each mutation
            // it re calls the api, to get new cart, 
            // REASON: refetching was making useCartQuery() component re render 20+ times.
            // refetch();
            queryClient.invalidateQueries({queryKey: cartQueryKey})
            console.log("Cart item is updated!! with data: ", data);
        },

        onError: (error) => {
            if(axios.isAxiosError(error) && error.response?.data.message){
                alert(error.response.data.message);
            }
            else{
                alert('Something went wrong');
            }
        }
    })

    return query;
}