import {z} from "zod"
import { isValidJWT } from "zod/v4/core";


export const TokenSchema = z.object({
    access: z.string().refine( (val) => isValidJWT(val), {
        error: "Not received Jwt access token",
    }),

    refresh: z.string().refine( (val) => isValidJWT(val), {
        error: "Not received valid Jwt refresh token",
    })
});


export type TokenType = z.infer<typeof TokenSchema>;