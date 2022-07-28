const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('dotenv').config()

const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database
});

sqlConnection.connect(err => {
    if (err)
    throw (err);
    console.log('You Have Been Connected!')
    initialPrompt();
});

const initialPrompt = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Please select a process to begin',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add A Role',
                'View All Departments',
                'Add Department',
            ]
        }
    ])
    .then((answers) => {
        const { choices } = answers;
        if (answers === 'View All Employees') {
            return allEmployees();
        }
        if (answers === 'Add Employee') {
            return addEmployees();
        }
        if (answers === 'Update Employee Role') {
            return updateEmployee();
        }
        if (answers === 'View All Roles') {
            return allRoles();
        }
        if (answers === 'Add A Role') {
            return addRoles();
        }
        if (answers === 'View All Departments') {
            return allDepartments();
        }
        if (answers === 'Add Department') {
            return addDepartments();
        }
    })
}

function allEmployees() {
const sqlQuery = `
SELECT employee.id,
employee.first_name,
employee.last_name,
role.title,
department.name AS department,
role.salary,
concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
`;
};

function addEmployees() {

};

function updateEmployee() {

};

function allRoles() {

};

function addRoles() {

};

function allDepartments() {

};
function addDepartments() {

};