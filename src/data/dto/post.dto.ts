import { z } from "zod";
import { postSchema } from "@/data/schemas/dtoValidations/postSchema";

export type PostDTO = z.infer<typeof postSchema>;
