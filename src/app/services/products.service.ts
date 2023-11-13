import axiosInstance from "@/app/lib/axios.config";
import { ProductDSO } from "@/data/dso/product.dso";
import { type ProductDTO  } from "@/data/dto/product.dto";
import { productMigration } from "@/data/migration/product.migration";
import { endpoints } from "@/data/utils/endpoints";

export const getProductsService = async (query: string) => {
  const res = await axiosInstance.get<ProductDTO[]>(endpoints.products(query));
  return res.data.map(productMigration);
};
export const filterPriceProductsService = (query: string ) =>{
  return axiosInstance.get(endpoints.filterPriceProducts(query)).then(res =>{
      return res.data.map(productMigration)
  })
}
export const deleteProductService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.product(id));
  return res.data.products;
};
export const addProductService = async (product:ProductDSO) => {
  const res = await axiosInstance.post(endpoints.products(), product);
  return res.data;
};
