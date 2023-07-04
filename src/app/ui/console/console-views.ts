import { IAsciiArt } from "../../domain/interfaces/ascii-art-ui";
import { IConsoleViews } from "../../domain/interfaces/console-views";
import { IMachine } from "../../domain/interfaces/machine";
import { Product } from "../../domain/models/product";
import { Utils } from "../../core/utils/utils";

export class ConsoleViews implements IConsoleViews {
  private machine: IMachine;
  private arts: IAsciiArt;
  private selectedProduct: string = "";

  constructor(arts: IAsciiArt, machine: IMachine) {
    this.machine = machine;
    this.arts = arts;
  }

  initial(): void {
    Utils.clearConsole();
    Utils.print('=== Vending Machine === ');
    this.arts.printVendingMachine();
    this.showCredit();
    Utils.print('[1] - Insert money');
    Utils.print('[2] - Select product');
    Utils.print('[3] - Exit \n');
  }

  chargeCredit(): void {
    Utils.clearConsole();
    Utils.print('=== Insert Money === \n');
    this.arts.printMoney();
    this.showCredit();
  }

  selectProduct(): void {
    Utils.clearConsole();
    Utils.print('=== Select Product === \n');
    this.arts.printJackie();
    this.showProducts();
    this.showCredit();
  }

  deliverProduct(): void {
    Utils.clearConsole();
    Utils.print('=== Product Delivery === \n');
    this.arts.printFrame(this.selectedProduct);
    Utils.print('Thank you for your purchase \n');
    Utils.print('[1] - Insert more money');
    Utils.print('[2] - Select another product');
    Utils.print('[3] - Exit \n');
  }

  exit(): void {
    Utils.clearConsole();
    this.deliverChange();
    Utils.print('Thank you for using the vending machine');
    setTimeout(() => {
      process.exit(0);
    }, 3000);
  }

  setSelectedProduct(productName: string): void {
    this.selectedProduct = productName;
  }


  private deliverChange(): void {
    const change = this.machine.giveChange();
    if (change > 0) {
      Utils.print('=== Change Delivery === \n');
      this.arts.printCoins();
      Utils.print(`Change: $${change}\n`);
    }
  }

  private showCredit(): void {
    const credit = this.machine.getCredit();
    Utils.print(`Credits: $${credit} \n`);
  }

  private showProducts(): void {
    const products = this.machine.getAvailableProducts();
    const itemsFormat = this.formatToTable(products);
    console.table(itemsFormat);
    Utils.print('\n');
  }

  private formatToTable(list: Product[]): any {
    return list.reduce((result, obj) => {
      const id = obj.getId();
      const name = obj.getName();
      const price = obj.getPrice();
      const stock = obj.getQuantity();

      result[id] = { name, price, stock };
      return result;
    }, {} as { [key: string]: { name: string, price: number, stock: number } });
  }
}
