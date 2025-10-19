import { env } from "@/env";
import axios from "axios";


export type MenuItemsType = {
    name: string,
    price: number,
    food_type: "V" | "NV",
    image_url: string,
}

export type MenuDataType = {
    restaurant_id: string, // won't do anything with this either
    categories: {
        name: string,
        menu_items: MenuItemsType[], 
    }
}


type CategoryType = {
    names: string[]
}

export type OneRestDetails = {
    id: string,
    r_name: string,
    avg_cost: number,
    rating: number,
    rating_count_str: string,
    cuisine: string[],
    menu_image: string, // don't have to do anything with this for now
    r_image_url: string,
    address: string,
    category: CategoryType[],
    menu_data: MenuDataType[],
}

export type OneRestMenuApiResponse = {
    status: "success" | "exception",
    results: OneRestDetails[],
}

const apiUrl = env.VITE_PUBLIC_SERVER_URL;

export async function oneRestMenuApi(restId: string, category?: string){
    const finalUrl = `${apiUrl}/restaurants/api/v1/restaurants/${restId}/${category ? category : ""}`;
    console.log("Final Menu URL: ", finalUrl);
    
    const response = await axios.get<OneRestMenuApiResponse>(finalUrl);

    return response.data;
}