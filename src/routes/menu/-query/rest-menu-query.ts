import { useQuery } from "@tanstack/react-query";
import { type MenuDataType, type OneRestDetails, oneRestMenuApi } from "../-api/menu-api";
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
    const [catMenudata, setCateMenuData] = useState<MenuDataType>();
    const [selectedCategory, setSelectedCategory] = useState<string>("");

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

            if (category){
                setSelectedCategory(category);
            }
            else{
                setSelectedCategory(restaurantQuery.data.results[0].category[0].names[1]);
            }
        }
    }, [restaurantQuery.isSuccess, restaurantQuery.data, category]);


    // This is again run, to get menu items of particular category
    const categoryQuery = useQuery({
        queryKey: ["menu", restId, "category", selectedCategory],
        queryFn: () => oneRestMenuApi(restId, selectedCategory),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: enabled && restaurantQuery.isSuccess && !!selectedCategory,
        retry: 2,
    });

    useEffect( () => {
        if(categoryQuery.isSuccess){
            setCateMenuData(categoryQuery.data.results[0].menu_data[0]);
        }
    }, [categoryQuery.isSuccess, categoryQuery.data]);

    return {
        restaurantData: restMenuData,
        categoryData: catMenudata,
        isRestaurantSuccess: restaurantQuery.isSuccess,
        isCategorySuccess: categoryQuery.isSuccess,
        isRestaurantError: restaurantQuery.isError,
        isCategoryError: categoryQuery.isError,
        isLoading: restaurantQuery.isLoading || categoryQuery.isLoading,
    };
}