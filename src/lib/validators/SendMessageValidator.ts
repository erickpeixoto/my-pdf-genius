import {z} from "zod"

export const SendMessageValidator = z.object({
    fileId: z.string(),
    message: z.string(),
    lang: z.string().optional(),
})