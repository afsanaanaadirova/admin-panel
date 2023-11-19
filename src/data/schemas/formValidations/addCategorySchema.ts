import { z } from "zod";

export const addCategorySchema = z.object({
    id: z.number().optional(),
    categoryName: z.string().min(1, "Title field is required").min(5, "Min 5 characters"),
  });
