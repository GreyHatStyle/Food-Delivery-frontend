import { useAuthStore } from "@/store/auth-store"
import {useMutation} from "@tanstack/react-query"
import { LoginApi } from "../api/login-api";
import axios from "axios";
import { useState } from "react";


export function useLoginQuery(setDialogOpen: (val: boolean) => void){
    const {setUserDetails, setTokens} = useAuthStore((state) => state);
    const [errorToDisplay, setErrorToDisplay] = useState<string>("");

    const {data, mutate, isPending, isSuccess} = useMutation({
        mutationFn: LoginApi,
        onSuccess: (data) => {
            setUserDetails({
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                phone_no: data.user.phone_no,
            });

            setTokens(data.tokens);

            // console.log("Success!! data: ", data);

            setDialogOpen(false);
            const location = window.location.href;
            window.location.href = location;
        },
        onError: (error) => {
            if(axios.isAxiosError(error) && error.response?.data?.message){
                setErrorToDisplay(error.response.data.message);
            }
            else{
                alert('An error occurred!!');
            }
        }
    })

    return {data, mutate, isPending, isSuccess, errorToDisplay};
}