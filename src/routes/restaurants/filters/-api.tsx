import axios from "axios";
import { env } from "@/env"
import type { QueryParamsType } from "./page";

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

type GetRestaurantsFromCityInputType = {
    searchQuery: string,
} & QueryParamsType

const apiUrl = env.VITE_PUBLIC_SERVER_URL;

export const getRestaurantsFromCity = async ({
    searchQuery,
    city,
    pageLimit,
    pageOffset
}: GetRestaurantsFromCityInputType): Promise<GetRestaurantFromCityApiResponse> => {
    
    console.log("Search QUery: ", searchQuery);

    const finalApiUrl = `${apiUrl}/restaurants/api/v1/restaurants/?city=${city}&ordering=-rating&ordering=-rating_count_int&offset=${pageOffset}&limit=${pageLimit}`;

    const response = await axios.get<GetRestaurantFromCityApiResponse>(finalApiUrl);

    return response.data;
}