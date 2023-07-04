export abstract class ProductDesign {
  protected id: number;
  protected name: string;
  protected price: number;
  protected quantity: number;

  abstract getId(): number;
  abstract getName(): string;
  abstract getPrice(): number;
  abstract getQuantity(): number;
  abstract setQuantity(quantity: number): void;
}

export class Product extends ProductDesign {
  constructor(id: number, name: string, price: number, quantity: number) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
