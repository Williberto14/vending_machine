export interface IPaymentService {
  processPayment(amount: number): boolean;
  increaseCredit(amount: number): void;
  getCredit(): number;
  resetCredit(): void;
}
