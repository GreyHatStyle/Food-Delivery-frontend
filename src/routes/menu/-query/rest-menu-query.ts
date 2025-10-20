import { useQuery } from "@tanstack/react-query";
import {type OneRestDetails, oneRestMenuApi } from "../-api/menu-api";
import { useEffect, useState } from "react";


export function useSelectRestaurantQuery({
    restId,
    category,
    enabled,
}: {
    restId: string,
    category?: string,
    enabled?: boolean,
}){

    const [restMenuData, setRestMenuData] = useState<OneRestDetails>();
    const [availableCategories, setAvailableCategories] = useState<string[]>();

    const restaurantQuery = useQuery({
        queryKey: ["menu", restId],
        queryFn: () => oneRestMenuApi(restId),
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        enabled: enabled,
        retry: 2,
    });

    useEffect( () => {
        if(restaurantQuery.isSuccess){
            setRestMenuData(restaurantQuery.data.results[0]);
            setAvailableCategories(restaurantQuery.data.results[0].category[0].names);
        }
    }, [restaurantQuery.isSuccess, restaurantQuery.data, category]);



    return {
        restaurantData: restMenuData,
        availableCategories,
        isRestaurantSuccess: restaurantQuery.isSuccess,
        isRestaurantError: restaurantQuery.isError,
        isLoading: restaurantQuery.isLoading,
    };
}