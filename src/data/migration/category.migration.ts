import { migrator } from "@/app/utils/migrator";
import { type CategoryDTO } from "@/data/dto/category.dto";
import { type CategoryModel } from "@/data/model/category.mode";
import { categorySchema } from "@/data/schemas/dtoValidations/categorySchema";

export const categoryMigration = (dto: CategoryDTO): CategoryModel => {
  return migrator(dto, categorySchema, (data) => ({
    id: data.id,
    name:data.categoryName,
    productId:data.productId
  }));
};
