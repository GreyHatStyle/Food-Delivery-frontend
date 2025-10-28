import { persist } from "zustand/middleware"
import {create} from "zustand"
import type { UserType } from "@/routes/-navbar/login/schema/user"
import type { TokenType } from "@/routes/-navbar/login/schema/token"


type AuthStoreType = {
    user: UserType | null,
    tokens: TokenType | null,

    setUserDetails: (data: UserType) => void,
    setTokens: (data: TokenType) => void,
    verifySession: () => boolean,
    logout: () => void,
}

export const useAuthStore = create<AuthStoreType>()(
    persist(
        (set, get) => ({
            user: null,
            tokens: null,

            setUserDetails: (data: UserType) => {
                set({user: data});
            },
            setTokens: (data: TokenType) => {
                set({tokens: data});
                // console.log("Tokens: ", get().tokens);
            },
            verifySession: () => {
                const user = get().user;
                // console.log("user: ", user);
                return user ? true : false;
            },
            logout: () => {
                set({
                    user: null,
                    tokens: null,
                })
            },
        }),{
            name: "Auth-Food-Delivery-Zomiggy",
        }
    ),
)