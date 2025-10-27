import {z} from "zod"



export const UserSchema = z.object({
    id: z.uuidv4(),
    username: z.string(),
    email: z.email(),
})
//TODO: add address blocks afterwards


export type UserType = z.infer<typeof UserSchema>;