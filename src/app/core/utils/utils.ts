const scanf = require("scanf");


export class Utils {

  static isNumber(value: any): boolean {

    if (value === null)
      return false;

    return !isNaN(value);
  }

  static clearConsole(): void {
    console.clear();
  }

  static readUserInput(message: string): number {
    this.print(message);
    const option = scanf("%d");
    this.print('\n');
    return option;
  }

  static print(message: string): void {
    console.log(message);
  }

}
