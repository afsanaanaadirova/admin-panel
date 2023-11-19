import axiosInstance from "@/app/lib/axios.config";
import { CategoryDSO } from "@/data/dso/category.dos";
import { type CategoryDTO } from "@/data/dto/category.dto";
import { categoryMigration } from "@/data/migration/category.migration";
import { endpoints } from "@/data/utils/endpoints";

export const getCategoriesService = async (query: string) => {
  const res = await axiosInstance.get<CategoryDTO[]>(
    endpoints.categories(query)
  );
  return res.data.map(categoryMigration);
};
export const getCategoryService = async (id: number) => {
  const res = await axiosInstance.get<CategoryDTO>(endpoints.category(id));
  return categoryMigration(res.data);
};

export const addCategoryService = async (category:CategoryDSO) => {
  const res = await axiosInstance.post(endpoints.categories(), category);
  return res.data;
};

export const deleteCategoryService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.category(id));
  return res.data.categories;
};

export const editCategoryService = (id: number,category:CategoryDSO) => {
  return axiosInstance.put(endpoints.category(id),category).then(res => {
      return res.data;
  })
}
