import { IProductService } from '../../domain/interfaces/product-service';
import { IPaymentService } from '../../domain/interfaces/payment-service';
import { IMachine } from '../../domain/interfaces/machine';
import { Product } from '../../domain/models/product';
import { Utils } from '../utils/utils';
import { MachineErrors } from '../constants/machine-errors';

export class Machine implements IMachine {
  private productService: IProductService;
  private paymentService: IPaymentService;

  constructor(productService: IProductService, paymentService: IPaymentService) {
    this.productService = productService;
    this.paymentService = paymentService;
  }

  getAvailableProducts(): Product[] {
    return this.productService.getProducts().filter((product) => product.getQuantity() > 0);
  }

  chargeCredit(amount: number): void {
    if (!Utils.isNumber(amount)) throw new Error(MachineErrors.AMOUNT_MUST_BE_A_NUMBER);

    if (amount <= 0) throw new Error(MachineErrors.AMOUNT_MUST_BE_GREATER_THAN_ZERO);

    this.paymentService.increaseCredit(amount);
  }

  processPurchase(productId: number): string {
    const product = this.productService.getProductById(productId);

    if (!product) throw new Error(MachineErrors.PRODUCT_NOT_FOUND);

    if (product.getQuantity() <= 0) throw new Error(MachineErrors.PRODUCT_OUT_OF_STOCK);

    const price = product.getPrice();

    if (!this.paymentService.processPayment(price)) throw new Error(MachineErrors.INSUFFICIENT_FUNDS);

    if (!this.productService.decreaseProductQuantity(productId)) throw new Error(MachineErrors.ERROR_PROCESSING_PURCHASE);

    return product.getName();
  }

  giveChange(): number {
    const credit = this.paymentService.getCredit();

    if (credit > 0) {
      this.paymentService.resetCredit();
    }

    return credit;
  }

  getCredit(): number {
    return this.paymentService.getCredit();
  }
}
