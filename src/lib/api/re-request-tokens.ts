import axios from "axios";
import { env } from "@/env";


export type ReReqTokenApiResponseType = {
    access: string,
    refresh: string,
}

const url = `${env.VITE_PUBLIC_SERVER_URL}/account/api/token/refresh/`;

export async function reRequestTokensApi(refresh_token: string){

    const response = await axios.post<ReReqTokenApiResponseType>(url, {
        refresh: refresh_token,
    })

    return response.data;
}