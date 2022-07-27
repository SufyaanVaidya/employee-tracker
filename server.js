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
        
    })
}