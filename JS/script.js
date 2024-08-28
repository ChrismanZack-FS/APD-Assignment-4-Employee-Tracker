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

//IIfE containing the main class
(() => {
	//new Main();
})();
