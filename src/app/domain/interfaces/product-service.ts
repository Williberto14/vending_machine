import { Product } from "../models/product";

export interface IProductService {
  getProducts(): Product[];
  getProductById(id: number): Product | undefined
  decreaseProductQuantity(id: number): boolean;
  validateStock(id: number): boolean;
}
