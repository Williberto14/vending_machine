import { PaymentService } from '../core/services/payment-service';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
  });

  it('getCredit should return the initial credit value', () => {
    expect(paymentService.getCredit()).toBe(0);
  });

  it('increaseCredit should increase the credit by the specified amount', () => {
    paymentService.increaseCredit(100);
    expect(paymentService.getCredit()).toBe(100);
  });

  it('processPayment should return true and decrease the credit if there is enough credit', () => {
    paymentService.increaseCredit(100);
    const result = paymentService.processPayment(50);
    expect(result).toBe(true);
    expect(paymentService.getCredit()).toBe(50);
  });

  it('processPayment should return false and not decrease the credit if there is not enough credit', () => {
    paymentService.increaseCredit(100);
    const result = paymentService.processPayment(150);
    expect(result).toBe(false);
    expect(paymentService.getCredit()).toBe(100);
  });

  it('should reset the credit to 0', () => {
    paymentService.increaseCredit(100);
    paymentService.resetCredit();
    expect(paymentService.getCredit()).toBe(0);
  });
});
