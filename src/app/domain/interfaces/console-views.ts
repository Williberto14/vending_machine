export interface IConsoleViews {
	initial(): void;
	exit(): void;
	chargeCredit(): void;
	selectProduct(): void;
	deliverProduct(): void;
	setSelectedProduct(name: string): void;
}