import axios from "axios"
import { env } from "@/env"
import type { UserType } from "../schema/user";
import type { TokenType } from "../schema/token";

const finalUrl = `${env.VITE_PUBLIC_SERVER_URL}/account/api/v1/login/`;

export type LoginApiResponse = {
    status: "success" | "error" | "exception",
    message: "string",
    user: UserType,
    tokens: TokenType,
}

export type LoginApiDataType = {
    username: string,
    password: string,
}

export async function LoginApi(data: LoginApiDataType){

    const response = await axios.post<LoginApiResponse>(finalUrl, data);

    if(response.status === 401){
        throw new Error(`Wrong username or password, ${response.data.message}`);
    }

    return response.data;
}