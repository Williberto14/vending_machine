import { Product } from "../models/product";

export interface IMachine {
  getAvailableProducts(): Product[];
  chargeCredit(amount: number): void;
  processPurchase(productId: number): string;
  giveChange(): number;
  getCredit(): number;
}
