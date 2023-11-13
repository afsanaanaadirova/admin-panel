import { z } from "zod"


export const categorySchema =z.object({
    id: z.number(),
    categoryName: z.string(),
    productId: z.number()
})
