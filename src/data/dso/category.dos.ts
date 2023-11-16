import { z } from "zod";
import { addCategorySchema } from "@/data/schemas/formValidations/addCategorySchema"

export type CategoryDSO = z.infer<typeof addCategorySchema>;