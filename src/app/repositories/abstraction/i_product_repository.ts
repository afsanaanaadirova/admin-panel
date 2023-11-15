import { ProductDSO } from "@/data/dso/product.dso";
import { type ProductModel } from "@/data/model/product.model";

export interface IProductRepository {
  getProducts(query: string): Promise<ProductModel[]>;
  getProduct(id: number): Promise<ProductModel>;
  filterPriceProducts(query: string): Promise<ProductModel[]>;
  deleteProduct(id: number): Promise<any>;
  addProduct(product: ProductDSO): Promise<any>;
  editProduct(id: number, product: ProductDSO): Promise<any>;
}
