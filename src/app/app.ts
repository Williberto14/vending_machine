import { IUserInterface } from "./domain/interfaces/user-Interface";
import { PaymentService } from "./core/services/payment-service";
import { ProductService } from "./core/services/product-service";
import { Machine } from "./core/machine/machine";
import { ConsoleViews } from "./ui/console/console-views";
import { ConsoleUI } from "./ui/console/console-ui";
import { AsciiArt } from "./ui/console/ascii-art-ui";
import { Product } from "./domain/models/product";

export class Application {
  private UI: IUserInterface;

  constructor(UI: IUserInterface) {
    this.UI = UI;
  }

  run(): void {
    this.UI.start();
  }
}

// Data mock for products in vending machine
const productsList: Product[] = [
  new Product(1, 'Coca-Cola', 2, 5),
  new Product(2, 'Fanta', 1.5, 5),
  new Product(3, 'Sprite', 1.5, 5),
  new Product(4, 'Pepsi', 2, 5),
  new Product(5, '7up', 1, 5),
];

// Dependency manager
//------------------
// Instance of vending machine
const vendingMachine = new Machine(new ProductService(productsList), new PaymentService());
// Instance of console UI
const UI = new ConsoleUI(vendingMachine, new ConsoleViews(new AsciiArt(), vendingMachine));

export const app = new Application(UI);
