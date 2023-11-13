import { z } from "zod";
import { addProductSchema } from "@/data/schemas/formValidations/addProductSchema"

export type ProductDSO = z.infer<typeof addProductSchema>;