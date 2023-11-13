import { z } from "zod"


export const productSchema =z.object({
    id: z.number(),
    name: z.string(),
    description:z.string(),
    category:z.string(),
    image:z.string(),
    price: z.number()
})
