import axiosInstance from "@/app/lib/axios.config";
import { ProductDSO } from "@/data/dso/product.dso";
import { type ProductDTO  } from "@/data/dto/product.dto";
import { productMigration } from "@/data/migration/product.migration";
import { endpoints } from "@/data/utils/endpoints";

export const getProductsService = async (query: string) => {
  const res = await axiosInstance.get<ProductDTO[]>(endpoints.products(query));
  return res.data.map(productMigration);
};

export const getProductService = async (id: number) => {
  const res = await axiosInstance.get<ProductDTO>(endpoints.product(id));
  return productMigration(res.data);
};

export const deleteProductService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.product(id));
  return res.data.products;
};

export const addProductService = async (product:ProductDSO) => {
  const res = await axiosInstance.post(endpoints.products(), product);
  return res.data;
};

export const editProductService = (id: number,product:ProductDSO) => {
  return axiosInstance.put(endpoints.product(id),product).then(res => {
      return res.data
  })
}