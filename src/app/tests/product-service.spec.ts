import { ProductService } from "../core/services/product-service";
import { Product } from "../domain/models/product";

describe('ProductService', () => {
  let productService: ProductService;
  let products: Product[];

  beforeEach(() => {
    products = [
      new Product(1, 'Product 1', 100, 10),
      new Product(2, 'Product 2', 125, 5),
      new Product(3, 'Product 3', 150, 0),
    ];
    productService = new ProductService(products);
  });

  describe('getProducts', () => {
    it('should return all products', () => {
      expect(productService.getProducts()).toEqual(products);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', () => {
      const product = productService.getProductById(2);
      expect(product).toEqual(products[1]);
    });

    it('should return undefined for non-existent product id', () => {
      const product = productService.getProductById(4);
      expect(product).toBeUndefined();
    });
  });

  describe('validateStock', () => {
    it('should validate stock correctly for available product', () => {
      expect(productService.validateStock(1)).toBe(true);
    });

    it('should validate stock correctly for out-of-stock product', () => {
      expect(productService.validateStock(3)).toBe(false);
    });

    it('should validate stock correctly for non-existent product', () => {
      expect(productService.validateStock(4)).toBe(false);
    });
  });

  describe('decreaseProductQuantity', () => {
    it('should discount product quantity when stock is available', () => {
      productService.decreaseProductQuantity(1);
      expect(products[0].getQuantity()).toBe(9);
    });

    it('should not discount product quantity when stock is not available', () => {
      productService.decreaseProductQuantity(3);
      expect(products[2].getQuantity()).toBe(0);
    });

    it('should not discount quantity for non-existent product', () => {
      productService.decreaseProductQuantity(4);
      // Ensure that no changes were made to any product's quantity
      expect(products[0].getQuantity()).toBe(10);
      expect(products[1].getQuantity()).toBe(5);
      expect(products[2].getQuantity()).toBe(0);
    });
  });
});
