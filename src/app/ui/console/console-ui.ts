import { ErrorMsg } from '../../core/constants/ui-error-msg';
import { ScanMsg } from '../../core/constants/scan-msg';
import { IUserInterface } from '../../domain/interfaces/user-Interface';
import { IConsoleViews } from '../../domain/interfaces/console-views';
import { IMachine } from '../../domain/interfaces/machine';
import { Utils } from '../../core/utils/utils';

export class ConsoleUI implements IUserInterface {
  private machine: IMachine;
  private views: IConsoleViews;

  constructor(machine: IMachine, views: IConsoleViews) {
    this.machine = machine;
    this.views = views;
  }

  start(): void {
    this.initialScreen();
  }

  // ------------------- Screens -------------------
  private initialScreen(): void {
    this.views.initial();
    this.initialHandler(Utils.readUserInput(ScanMsg.SELECT_OPTION));
  }

  private chargeCreditScreen(): void {
    this.views.chargeCredit();
    this.chargeCreditHandler(Utils.readUserInput(ScanMsg.CHARGE_CREDIT));
  }

  private selectProductScreen(): void {
    this.views.selectProduct();
    this.selectProductHandler(Utils.readUserInput(ScanMsg.SELECT_PRODUCT));
  }

  private deliverProductScreen(): void {
    this.views.deliverProduct();
    this.initialHandler(Utils.readUserInput(ScanMsg.SELECT_OPTION));
  }

  private exitScreen(): void {
    this.views.exit();
  }

  // ------------------- Handlers -------------------
  private selectProductHandler(input: number): void {
    if (input == 0) {
      this.initialScreen();
    } else {
      try {
        const selectedProduct = this.machine.processPurchase(input);
        this.views.setSelectedProduct(selectedProduct);
        this.deliverProductScreen();
      } catch (e: any) {
        Utils.print(ErrorMsg.PURCHASE);
        Utils.print(e.message);
        setTimeout(() => {
          this.initialScreen();
        }, 3000);
      }
    }
  }

  private initialHandler(input: number): void {
    switch (input) {
      case 1:
        this.chargeCreditScreen();
        break;
      case 2:
        this.selectProductScreen();
        break;
      case 3:
        this.exitScreen();
        break;
      default:
        Utils.print(ErrorMsg.INVALID_OPTION);
        this.initialScreen();
        break;
    }
  }

  private chargeCreditHandler(input: number): void {
    try {
      this.machine.chargeCredit(input);
      this.selectProductScreen();
    } catch (e: any) {
      Utils.print(ErrorMsg.CHARGE_CREDIT);
      Utils.print(e.message);
      setTimeout(() => {
        this.initialScreen();
      }, 3000);
    }
  }

}
