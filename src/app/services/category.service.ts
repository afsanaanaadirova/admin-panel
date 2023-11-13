import axiosInstance from "@/app/lib/axios.config";
import { type CategoryDTO  } from "@/data/dto/category.dto";
import { categoryMigration } from "@/data/migration/category.migration";
import { productMigration } from "@/data/migration/product.migration";
import { endpoints } from "@/data/utils/endpoints";

export const getCategoriesService = async (query: string) => {
  const res = await axiosInstance.get<CategoryDTO[]>(endpoints.categories(query));
  return res.data.map(categoryMigration);
};
export const productsFilterCategory = (query: string ) =>{
    return axiosInstance.get(endpoints.productsFilterCategory(query)).then(res =>{
        return res.data.map(productMigration)
    })
  }