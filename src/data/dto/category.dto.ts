import { z } from "zod";
import {categorySchema  } from "@/data/schemas/dtoValidations/categorySchema";

export type CategoryDTO = z.infer<typeof categorySchema>;
