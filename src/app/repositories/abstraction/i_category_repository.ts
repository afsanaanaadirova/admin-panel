import { CategoryDSO } from "@/data/dso/category.dos";
import { type CategoryModel } from "@/data/model/category.mode";

export interface ICategoryRepository {
  getCategories(query: string): Promise<CategoryModel[]>;
  getCategory(id: number): Promise<CategoryModel>;
  deleteCategory(id: number): Promise<any>;
  editCategory(id: number, category: CategoryDSO): Promise<any>;
  addCategory(category: CategoryDSO): Promise<any>;
}
