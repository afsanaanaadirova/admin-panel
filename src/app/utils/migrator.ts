import { ZodRawShape, z } from "zod";

export const migrator = <T, K>(
  dto: T,
  schema: z.ZodObject<ZodRawShape, "strip", z.ZodTypeAny, T, T>,
  mapper: (validated: T) => K
): K => {
  const validatedDTO = schema.safeParse(dto);

  if (!validatedDTO.success) {
    console.error(validatedDTO.error);
    return dto as unknown as K;
  }

  return mapper(validatedDTO.data);
};
