import { IProductRepository } from "../abstraction/i_product_repository";
import { type ProductModel } from "@/data/model/product.model";
import { getProductsService, deleteProductService, addProductService, editProductService, getProductService } from "@/app/services/products.service";
import { ProductDSO } from "@/data/dso/product.dso";

class ProductRepository implements IProductRepository {
  getProducts(query: string): Promise<ProductModel[]> {
    return getProductsService(query);
  }
  getProduct(id: number): Promise<ProductModel> {
    return getProductService(id);
  }
  deleteProduct(id: number): Promise<any> {
    return deleteProductService(id)
  }
  addProduct(product:ProductDSO): Promise<unknown> {
    return addProductService(product);
  }
  editProduct(id: number,product:ProductDSO): Promise<any> {
    return editProductService(id,product)
  }
}

export default new ProductRepository();
