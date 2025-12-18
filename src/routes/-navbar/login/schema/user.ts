import { z} from "zod"



export const UserSchema = z.object({
    id: z.uuidv4(),
    username: z.string(),
    email: z.email(),
    phone_no: z.string().max(13),
    first_name: z.string(),
    last_name: z.string(),
})
//TODO: add address blocks afterwards


export type UserType = z.infer<typeof UserSchema>;