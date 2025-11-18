import authAxiosInstance from "@/lib/auth-refresh-rotation";
import { useAuthStore } from "@/store/auth-store";
import { env } from "@/env";


export type UserAddressType = {
    id: number,
    main_address: string,
    city: string,
    state: string,
    pin_code: string,
    address_type: "HOM" | "OFI" | "OTH",
    updated_at: Date,
}

export type UserAddressAPIResponseType = {
    status: "success" | "error" | "exception",
    message: string,
    results: UserAddressType[],
}

const url = `${env.VITE_PUBLIC_SERVER_URL}/account/api/v1/address/`

export async function GetUserAddressAPI(){
    const {verifySession} = useAuthStore.getState();

    if (!verifySession()){
        throw new Error("Login required to load address");
    }

    const response = await authAxiosInstance.get<UserAddressAPIResponseType>(url);
    
    return response.data;
}