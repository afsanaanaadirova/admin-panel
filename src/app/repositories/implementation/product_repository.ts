import { IProductRepository } from "../abstraction/i_product_repository";
import { type ProductModel } from "@/data/model/product.model";
import { getProductsService,filterPriceProductsService, deleteProductService, addProductService } from "@/app/services/products.service";
import { ProductDSO } from "@/data/dso/product.dso";

class ProductRepository implements IProductRepository {
  getProducts(query: string): Promise<ProductModel[]> {
    return getProductsService(query);
  }
  filterPriceProducts(query: string): Promise<ProductModel[]> {
    return filterPriceProductsService(query);
  }
  deleteProduct(id: number): Promise<any> {
    return deleteProductService(id)
  }
  addProduct(product:ProductDSO): Promise<unknown> {
    return addProductService(product);
  }
}

export default new ProductRepository();
