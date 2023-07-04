import { IPaymentService } from "../../domain/interfaces/payment-service";

export class PaymentService implements IPaymentService {

  private credit: number = 0;

  getCredit(): number {
    return this.credit;
  }

  resetCredit(): void {
    this.credit = 0;
  }

  increaseCredit(amount: number): void {
    this.credit += amount;
  }

  processPayment(amount: number): boolean {

    if (this.credit < amount) return false;

    this.credit -= amount;
    return true;
  }
}
