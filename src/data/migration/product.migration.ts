import { migrator } from "@/app/utils/migrator";
import { type ProductDTO } from "@/data/dto/product.dto";
import { type ProductModel } from "@/data/model/product.model";
import { productSchema } from "@/data/schemas/dtoValidations/productSchema";

export const productMigration = (dto: ProductDTO):ProductModel  => {
  return migrator(dto, productSchema, (data) => ({
    id: data.id,
    name:data.name,
    description:data.description,
    category:data.category,
    image:data.image,
    price: data.price
  }));
};
