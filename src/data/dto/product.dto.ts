import { z } from "zod";
import { productSchema } from "@/data/schemas/dtoValidations/productSchema";

export type ProductDTO = z.infer<typeof productSchema>;
