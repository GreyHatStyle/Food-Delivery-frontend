import axios from "axios"
import { env } from "@/env"

export type CitiesApiRespType = {
    status: "success" | "exception",
    cities: string[],
}

export const GetAllCitiesAPI = async (): Promise<CitiesApiRespType> => {
    const apiUrl = `${env.VITE_PUBLIC_SERVER_URL}//restaurants/api/v1/cities/`;

    const response = await axios.get<CitiesApiRespType>(apiUrl);
    
    return response.data;
}

