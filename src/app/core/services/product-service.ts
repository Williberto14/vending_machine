import { IProductService } from '../../domain/interfaces/product-service';
import { Product } from '../../domain/models/product';

export class ProductService implements IProductService {

  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.getId() === id);
  }

  validateStock(id: number): boolean {

    const product = this.getProductById(id);

    if (!product) return false;

    return product.getQuantity() > 0
  }

  decreaseProductQuantity(id: number): boolean {
    const product = this.getProductById(id);

    if (!product) return false;

    if (!this.validateStock(id)) return false;

    product.setQuantity(product.getQuantity() - 1);
    return true;
  }
}
