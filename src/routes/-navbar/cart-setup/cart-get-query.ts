import { useQuery } from "@tanstack/react-query"
import { GetCartAPI } from "./cart-get-api"
import { useCartStore } from "@/store/cart-store"
import { useEffect } from "react"


export function useCartQuery(){
    const {setItems, setRestaurantId, setRestaurantName} = useCartStore(state => state)
    
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
            
        }

    }, [query.dataUpdatedAt])


    return query
}