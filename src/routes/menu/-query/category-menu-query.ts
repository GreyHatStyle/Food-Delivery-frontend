import { useQuery } from "@tanstack/react-query";
import { type MenuItemsType, oneRestMenuApi } from "../-api/menu-api";
import { useEffect, useState } from "react";


export function useGetMenuByCategoryQuery(restId: string, category: string | undefined){
    // setting up enabled so that hook runs only of the category comes

    const [categoryMenuData, setCatMenuData] = useState<MenuItemsType[]>();
    const [currentCategory, setCurCategory] = useState<string>(category || "");

    const {data, isSuccess } = useQuery({
        queryKey: ["restaurant", restId, "category", currentCategory],
        queryFn: () => oneRestMenuApi(restId, currentCategory),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        
        // prevent prefetching
        staleTime: 2 * 3600 * 24, // fresh data for 2 days
        gcTime: 5*60*1000,

        retry: 2,
        enabled: !!category,
    });

    useEffect( () => {
        if(isSuccess){
            setCatMenuData(data.results[0].menu_data[0].categories.menu_items);
        }
    }, [isSuccess, data]);


    // so if I change the category using this function then query will be called again
    const changeCategory = (newCategory: string) => {
        setCurCategory(newCategory);
    };

    return {
        categoryMenuData,
        isSuccess,
        currentCategory,
        changeCategory,
    }

}