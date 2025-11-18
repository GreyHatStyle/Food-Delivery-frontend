import { useQuery } from "@tanstack/react-query"
import { GetCartAPI } from "./cart-get-api"
import { useCartStore } from "@/store/cart-store"
import { useEffect } from "react"


export function useCartQuery(){
    const {setItems, setRestaurantId, setRestaurantName, setRestaurantImage} = useCartStore(state => state)
    
    const query = useQuery({
        queryKey: ['cart-items'],
        queryFn: GetCartAPI,
        staleTime: 60000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,

    })
    
    useEffect(() => {
        if(query.isSuccess && query.data.results){
            setItems(query.data.results.c_items);
            setRestaurantId(query.data.results.restaurant);
            setRestaurantName(query.data.results.restaurant_name);
            
            if(query.data.results.c_items.length > 0){
                setRestaurantImage(query.data.results.c_items[0].item_data.image_url);
            }
        }

    }, [query.dataUpdatedAt])


    return query
}