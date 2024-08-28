import { logger } from "./utilities.js";

//Employee class
class Employee {
	constructor(name, age) {
		this.name = name;
		this.age = age;
		this.annualSalary = 0;
	}
}

class PartTime extends Employee {
	constructor(name, age, payRate, hours) {
		super(name, age);
		this.payRate = payRate;
		this.hours = hours;
		this.employeeType = "PT";
		this.calculatePay();
	}
	calculatePay() {
		this.annualSalary = this.payRate * this.hours * 52;
	}
}

class Manager extends Employee {
	constructor(name, age, payRate) {
		super(name, age);
		this.payRate = payRate;
		this.employeeType = "FT";
		this.calculatePay();
	}
	calculatePay() {
		this.annualSalary = this.payRate * 40 * 53 - 1000;
	}
}

class Main {
	constructor() {
		this.employees = [
			new Manager("Moe", 40, 10),
			new PartTime("Curly", 37, 5, 20),
			new PartTime("Larry", 42, 6, 15),
		];
		this.run();
	}

	run() {
		this.displayMenu();
		let option = prompt(
			"Main Menu \n1. Add Employee \n2. Remove Employee \n3. Edit Employee\n4. Display Employees \n\nEnter Selection"
		);
		if (option === "1") {
			this.addEmployee();
		} else if (option === "2") {
			this.removeEmployee();
		} else if (option === "3") {
			this.editEmployee();
		} else if (option === "4") {
			this.displayEmployees();
		} else {
			console.log("Invalid choice");
		}
	}

	displayMenu() {
		logger("Three Stooges Burgers");
	}

	addEmployee() {
		const name = prompt("Enter employee name:");
		const age = parseInt(prompt("Enter employee age:"));
		const payRate = parseFloat(prompt("Enter pay rate:"));
		const hours = parseInt(prompt("Enter hours per week:"));

		let employee;
		if (hours < 40) {
			employee = new PartTime(name, age, payRate, hours);
		} else {
			employee = new Manager(name, age, payRate);
		}

		this.employees.push(employee);
		console.clear();
		this.displayEmployees();
	}

	//remove employee by ID and name
	removeEmployee() {
		const id = parseInt(prompt("Enter employee number to remove:"), 10);
		const name = prompt("Enter employee name to remove:");

		this.employees = this.employees.filter(
			(emp, index) => index !== id - 1 && emp.name !== name
		);
		console.log("Employee removed successfully.");
		this.displayEmployees();
	}

	//edit the pay rate
	editEmployee() {
		const id = parseInt(prompt("Enter employee number to edit:"), 10);
		const newPayRate = parseFloat(prompt("Enter new pay rate:"));

		if (id > 0 && id <= this.employees.length) {
			this.employees[id - 1].payRate = newPayRate;
			this.employees[id - 1].calculatePay();
			console.log("Employee pay rate updated successfully.");
		}
		this.displayEmployees();
	}

	//show the employee table
	displayEmployees() {
		console.clear();
		logger("Three Stooges Burgers");
		logger("ID\tName\tSalary\thrs\tpay\tFT/PT");

		this.employees.forEach((emp, index) => {
			logger(
				`${index + 1}\t${emp.name}\t${emp.annualSalary.toFixed(2)}\t${
					emp.hours || "40"
				}\t${emp.payRate}\t${emp.employeeType}`
			);
		});

		this.run();
	}
}

//IIfE containing the main class
(() => {
	new Main();
})();
