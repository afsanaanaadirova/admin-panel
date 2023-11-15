import { type CategoryModel } from "@/data/model/category.mode";
import { ProductModel } from "@/data/model/product.model";

export interface ICategoryRepository {
  getCategories(query: string): Promise<CategoryModel[]>;
  productsFilterCategory(query: string): Promise<ProductModel[]>;
  deleteCategory(id: number): Promise<any>;
}
