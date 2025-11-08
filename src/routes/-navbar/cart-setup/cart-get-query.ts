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
    // BUG: This uncanny useEffect() is re-rendering and saving data more than 10 times, need to deal
    // with this soon
    useEffect(() => {
        if(query.isSuccess && query.data.results){
            setItems(query.data.results.c_items);
            setRestaurantId(query.data.results.restaurant);
            setRestaurantName(query.data.results.restaurant_name);
            
            // console.log("it ran");
        }

    }, [query.dataUpdatedAt])


    return query
}