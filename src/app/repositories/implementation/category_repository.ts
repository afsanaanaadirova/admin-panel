import { ICategoryRepository } from "../abstraction/i_category_repository";
import { type CategoryModel } from "@/data/model/category.mode";
import { getCategoriesService, productsFilterCategory } from "@/app/services/category.service";
import { ProductModel } from "@/data/model/product.model";

class CategoryRepository implements ICategoryRepository {
  getCategories(query: string): Promise<CategoryModel[]> {
    return getCategoriesService(query);
  }
  productsFilterCategory(query: string): Promise<ProductModel[]> {
      return productsFilterCategory(query)
  }
}

export default new CategoryRepository();
