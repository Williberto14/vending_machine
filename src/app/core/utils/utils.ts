const scanf = require("scanf");


export class Utils {

  // method that validates if the value is a number
  static isNumber(value: any): boolean {
    // validate null
    if (value === null) {
      return false;
    }
    return !isNaN(value);
  }

  // method clears the console
  static clearConsole(): void {
    console.clear();
  }

  // method that reads the user's input
  static readUserInput(message: string): number {
    this.print(message);
    const option = scanf("%d");
    this.print('\n');
    return option;
  }

  // method that prints a message
  static print(message: string): void {
    console.log(message);
  }

}
