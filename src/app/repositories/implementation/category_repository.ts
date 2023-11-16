import { ICategoryRepository } from "../abstraction/i_category_repository";
import { type CategoryModel } from "@/data/model/category.mode";
import { addCategoryService, deleteCategoryService, editCategoryService, getCategoriesService, getCategoryService } from "@/app/services/category.service";
import { CategoryDSO } from "@/data/dso/category.dos";

class CategoryRepository implements ICategoryRepository {
  getCategory(id: number): Promise<CategoryModel> {
     return getCategoryService(id)
  }
  getCategories(query: string): Promise<CategoryModel[]> {
    return getCategoriesService(query);
  }
  deleteCategory(id: number): Promise<any> {
     return deleteCategoryService(id)
  }
  editCategory(id: number,category:CategoryDSO): Promise<any> {
    return editCategoryService(id,category)
  }
  addCategory(category:CategoryDSO): Promise<unknown> {
    return addCategoryService(category);
  }
}

export default new CategoryRepository();
