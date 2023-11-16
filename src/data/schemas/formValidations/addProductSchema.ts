import { z } from "zod";

export const addProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Title field is required").min(5, "Min 5 characters"),
  description: z.string(),
  category: z.string(),
  price: z.coerce.number().positive(),
  image: z.string()
});
