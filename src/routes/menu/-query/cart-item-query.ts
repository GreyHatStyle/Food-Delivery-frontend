import { useMutation } from "@tanstack/react-query";
import { cartItemAddRemoveAPI } from "../-api/cart-item-add-remove-api";
import { useCartStore } from "@/store/cart-store";
import axios from "axios";
import { useCartQuery } from "@/routes/-navbar/cart-setup/cart-get-query";


export function useCartItemQuery(currentRestId: string){
    const {clearCart, restaurant_id: prevRestId} = useCartStore();
    const {refetch} = useCartQuery();
    
    const query = useMutation({
        mutationFn: cartItemAddRemoveAPI,
        gcTime: 0,
        onSuccess: () => {
            if (currentRestId != prevRestId){
                clearCart();
            }
            refetch();
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