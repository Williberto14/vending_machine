import { Utils } from "../core/utils/utils";

describe('Utils', () => {

  describe('isNumber', () => {

    it('should return true for valid numbers', () => {
      expect(Utils.isNumber(10)).toBe(true);
      expect(Utils.isNumber(3.14)).toBe(true);
    });

    it('isNumber returns false for invalid values', () => {
      expect(Utils.isNumber('abc')).toBe(false);
      expect(Utils.isNumber(NaN)).toBe(false);
      expect(Utils.isNumber(null)).toBe(false);
      expect(Utils.isNumber(undefined)).toBe(false);
    });

  });

  describe('clearConsole', () => {

    it('clearConsole calls the clear method', () => {
      // Mock the console.clear method
      const mockConsoleClear = jest.spyOn(console, 'clear');

      Utils.clearConsole();

      expect(mockConsoleClear).toHaveBeenCalled();
    });
  });

  describe('print', () => {

    it('print calls the console.log method', () => {
      // Mock the console.log method
      const mockConsoleLog = jest.spyOn(console, 'log');

      Utils.print('test');

      expect(mockConsoleLog).toHaveBeenCalledWith('test');
    });

  });

});
