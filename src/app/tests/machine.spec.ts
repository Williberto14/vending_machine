import { Machine } from "../core/machine/machine";
import { PaymentService } from "../core/services/payment-service";
import { ProductService } from "../core/services/product-service";
import { IPaymentService } from "../domain/interfaces/payment-service";
import { IProductService } from "../domain/interfaces/product-service";
import { Product } from "../domain/models/product";

describe('Machine', () => {
  let machine: Machine;
  let productService: IProductService;
  let paymentService: IPaymentService;

  beforeEach(() => {
    const products: Product[] = [
      new Product(1, 'Product 1', 2.99, 10),
      new Product(2, 'Product 2', 5.99, 5),
      new Product(3, 'Product 3', 1.99, 0),
    ];

    productService = new ProductService(products);
    paymentService = new PaymentService();

    machine = new Machine(productService, paymentService);
    machine.chargeCredit(5);
  });

  describe('getAvailableProducts', () => {

    it('returns products with quantity greater than 0', () => {
      const availableProducts = machine.getAvailableProducts();

      expect(availableProducts.length).toBe(2);
      expect(availableProducts[0].getId()).toBe(1);
      expect(availableProducts[1].getId()).toBe(2);
    });

  });

  describe('chargeCredit', () => {

    it('increases the credit in the payment service', () => {
      machine.chargeCredit(10);
      expect(paymentService.getCredit()).toBe(15);
    });

    it('returns the current credit in the payment service', () => {
      machine.chargeCredit(5);
      expect(machine.getCredit()).toBe(10);
    });

    it('throws an error if amount is not a number', () => {
      expect(() => machine.chargeCredit(undefined as any)).toThrowError('Amount must be a number');
    });

    it('throws an error if amount is less than or equal to zero', () => {
      expect(() => machine.chargeCredit(0)).toThrowError('Amount must be greater than zero');
    });

  });

  describe('processPurchase', () => {

    it('deducts product quantity, processes payment and returns product name', () => {
      const productName = machine.processPurchase(1);
      expect(productService.getProductById(1)?.getQuantity()).toBe(9);
      expect(paymentService.getCredit()).toBeCloseTo(2.01);
      expect(productName).toBe('Product 1');
    });

    it('should process a valid purchase', () => {
      const productId = 1;
      const product = productService.getProductById(productId)!;
      const productName = product.getName();

      const result = machine.processPurchase(productId);

      expect(productService.getProductById(productId)?.getQuantity()).toBe(9);
      expect(paymentService.getCredit()).toBeCloseTo(2.01);
      expect(result).toBe(productName);
      expect(machine.getAvailableProducts().length).toBe(2);
    });

    it('should throw an error for a non-existent product', () => {
      const productId = 4;

      expect(() => machine.processPurchase(productId)).toThrowError('Product not found');
    });

    it('should throw an error for an out-of-stock product', () => {
      const productId = 3;

      expect(() => machine.processPurchase(productId)).toThrowError('Product out of stock');
    });

    it('should throw an error for insufficient funds', () => {
      const productId = 2;

      expect(() => machine.processPurchase(productId)).toThrowError('Insufficient funds');
    });

    it('should throw an error when processing purchase fails', () => {
      const productId = 1;
      jest.spyOn(productService, 'decreaseProductQuantity').mockImplementationOnce(() => false);

      expect(() => machine.processPurchase(productId)).toThrowError('Error processing purchase');
    });

  });

  describe('giveChange', () => {

    it('giveChange returns the remaining credit and resets the credit in the payment service', () => {
      machine.chargeCredit(10);
      const change = machine.giveChange();

      expect(change).toBe(15);
      expect(paymentService.getCredit()).toBe(0);
    });

    it('giveChange returns the remaining credit and resets the credit in the payment service', () => {
      const change = machine.giveChange();

      expect(change).toBe(5);
      expect(paymentService.getCredit()).toBe(0);
    });

  });

  describe('getCredit', () => {

    it('returns the current credit in the payment service', () => {
      expect(machine.getCredit()).toBe(5);
    });

  });
});
