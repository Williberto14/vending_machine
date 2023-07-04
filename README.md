# Vending Machine

This project was developed applying SOLID principles and using a clean architecture. Focused on abstractions. The code is organized in layers, each with a specific responsibility.

This project implements a console-based simulation of a vending machine using Node.js. It allows you to interact with the machine as if you were making a real purchase. The project is developed in TypeScript and uses the `console` and `scanf` libraries for input and output.

The application is capable of:

- Insert an amount of money.
- Display the list of products available for purchase.
- Select a product to purchase.
- Validate that the selected product is available.
- Validate that the credit is sufficient to purchase the product.
- Return the corresponding change when exiting.
- The whole process is accompanied by illustrative images.

## Requirements

To run the project, you need to have Node.js installed on your system. You can download it from the official website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Download

You can download the project directly from the GitHub repository. Open your terminal and execute the following command:

```bash
git clone https://github.com/Williberto14/Frontend_learning_exercises.git
```

then move to the **vending_machine** folder.

```bash
cd vending_machine
```

## Installation

Before running the project, you need to install the dependencies. Make sure you have Node.js and npm (Node Package Manager) installed on your system. Then, from the root folder of the project, run the following command:

```bash
npm install
```

This will install all the necessary dependencies listed in the `package.json` file.

## Execution

Once the dependencies are installed, you can compile the application. To do so, run the following command:

```bash
npm run build
```

This will create a `dist` directory in the root of the project, which contains the compiled code. To run the application, execute the following command:

```bash
node dist/bundle.js
```

or in PowerShell:

```pwsh
node .\dist\bundle.js
```

This will start the vending machine simulation in the console. Follow the instructions displayed on the screen to perform different actions, such as selecting products, making payments, and receiving the corresponding change.

## Running Unit Tests

Make sure you have installed the development dependencies by running the following command in the terminal:

```bash
npm install --save-dev jest
```

Then, run the following command to execute the unit tests:

```bash
npm run test
```

This will execute Jest and run all the unit tests you have defined in your project. You will see the test results in the console.

Enjoy the experience of interacting with the vending machine!
