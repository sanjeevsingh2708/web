require('./db/db.connect');

const Department = require('./models/department.model');
const Employee = require('./models/employee.model');

const departmentData = {
    name: "computer Science",
    location: "Delhi"
}

//function  to add department in db

const addDepartment = async()=>{
    try {
        const newDepartment = new Department(departmentData);
        await newDepartment.save();
        console.log("Department added sucessfully")
    } catch (error) {
        throw error;
    }
}

// addDepartment();

const employeeData ={
    name: "Sanjeev singh",
    email: "sanjeev@gmail.com",
    department : '6763fc19b73266624ccdd99e'
}

//function to add employee in db
const addEmployee = async()=>{
    try {
        const newEmployee = new Employee(employeeData);
        await newEmployee.save();
        console.log("Emplyee added sucessfully")
    } catch (error) {
        throw error
    }
}

// addEmployee()

// function to get all employees
const getAllEmpployee = async ()=>{
    try {
        const allEmployee = await Employee.find().populate("department")
        console.log(allEmployee)
    } catch (error) {
        throw error
    }
}

getAllEmpployee()

