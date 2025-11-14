import axios from "axios";
import { env } from "@/env";
import { useAuthStore } from "@/store/auth-store";
import { reRequestTokensApi } from "./api/re-request-tokens";


const authAxiosInstance = axios.create({
    baseURL: env.VITE_PUBLIC_SERVER_URL, 
});


authAxiosInstance.interceptors.request.use((config) => {
    const access_token = useAuthStore.getState().tokens?.access;

    config.headers.Authorization = `Bearer ${access_token}`

    // console.log("Axios auth config: ", config);

    return config;
})

authAxiosInstance.interceptors.response.use(
    (response) => {
        // Object.assign(response.data, {"brother": "what are you doing"})
        // console.log("The interceptor response: ", response);
        return response;
    },
    async (error) => {

        const original_request = error.config;
        console.log("Original Request: ", original_request);


        if(error.response.status === 401 && !original_request._retry){
            original_request._retry = true; // prevent infinite api calling retrying in worst case

            try{

                const refresh_token = useAuthStore.getState().tokens?.refresh;

                if(!refresh_token) throw new Error("No refresh token stored!!")

                const data = await reRequestTokensApi(refresh_token);
                useAuthStore.getState().setTokens(data);

                // console.log("Entered the refresh rotation, tokens in zustand ", useAuthStore.getState().tokens);
                original_request.headers.Authorization = `Bearer ${data.access}`;

                return authAxiosInstance(original_request);

            }

            catch(new_error){
                console.log('refresh rotation error: ', new_error);
                alert("Session expired!! please login again");

                useAuthStore.getState().logout();

                window.location.href = '/';
                return Promise.reject(error);
            }

        }

        return Promise.reject(error);

    }
)


export default authAxiosInstance;