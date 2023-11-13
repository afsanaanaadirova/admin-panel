import { z } from "zod"

export const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  body: z.string(),
  title: z.string()
})