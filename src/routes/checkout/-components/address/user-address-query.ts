import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { GetUserAddressAPI, type UserAddressAPIResponseType } from "./user-address-api";
import type { AxiosError } from "axios";


export function useGetAddressQuery(){
    const {user} = useAuthStore.getState();
    
    const query = useQuery<UserAddressAPIResponseType, AxiosError>({
        queryKey: ["user-address", user?.id],
        queryFn: GetUserAddressAPI,
        refetchOnWindowFocus: false,
        staleTime: 60000,
        refetchOnMount: false,
        retry: 0,
    })

    return query;
}