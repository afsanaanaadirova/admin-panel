import { z } from "zod";
import { addPostSchema } from "@/data/schemas/formValidations/addPostSchema";

export type PostDSO = z.infer<typeof addPostSchema>;