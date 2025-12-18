import axios from "axios";
import { env } from "@/env";

export type RestaurantDataType = {
  id: string,
  r_name: string,
  rating: string,
  rating_count_str: string,
  cuisine: string[],
  menu_image: string,
  r_image_url: string | null,
}

export type GetRestaurantFromCityApiResponse = {
  status: "success" | "exception",
  count: number,
  next?: string,
  previous?: string,
  results: RestaurantDataType[],
}


const apiUrl = env.VITE_PUBLIC_SERVER_URL;

export const getRestaurantsFromCity = async ( searchQueryString: string): Promise<GetRestaurantFromCityApiResponse> => {
    

    
    const finalApiUrl = `${apiUrl}/restaurants/api/v1/restaurants/?${searchQueryString}&ordering=-rating&ordering=-rating_count_int`;

    // console.log("Final selected API URL: ", finalApiUrl);

    const response = await axios.get<GetRestaurantFromCityApiResponse>(finalApiUrl);

    return response.data;
}