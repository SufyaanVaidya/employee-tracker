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

sqlConnection.promise().query(sqlQuery, (err, res) => {
    if(err) throw err;
    console.table(res);
    initialPrompt();
});
};

function addEmployees() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message:'Please enter the employees first name',
            
        },
        {
            type: 'input',
            name: 'lastName',
            message:'Please enter the employees last name',

        }
    ])
    .then(answers => {
        const fullName = [answers.firstName, answers.lastName]
        const rolesTable = `SELECT role.id, role.title FROM role`;
        sqlConnection.promise().query(rolesTable, (err, data) => {
            if (err) throw err;
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: data.map(({ id, title }) => ({name: title, value: id }))
                }
            ])
        })
    })
    .then(roleSelected => {
        fullName.push(roleSelected.role);
        const sqlManager = `SELECT * FROM employee`;
        sqlConnection.promise().query(sqlManager, (err, data) => {
            if (err) throw err;
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: data.map(({ id, first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id }))
                }
            ])
            .then(managerSelected => {
                fullName.push(managerSelected.role);
                const empChartAdd = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                sqlConnection.query(empChartAdd, fullName, (err, res) => {
                    if (err) throw err;
                    console.log('Employee Added!')
                    allEmployees();
                })
            })
        })
        
    })

};

function updateEmployee() {
const sqlEmployee = `SELECT * FROM employee`;
sqlConnection.promise().query(sqlEmployee, (err, data) => {
    if (err) throw err;
    inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'name',
                    message: 'Which employee would you like to modify?',
                    choices: data.map(({ id, first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id }))
                }
            ])
            .then(employeeSelected => {
                const empUpdate = [];
                empUpdate.push(employeeSelected.name);
                const sqlUpdate = `SELECT * FROM role`;
                sqlConnection.promise().query(sqlUpdate, (err, data) => {
                    if (err) throw err;
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the employees role?',
                            choices: data.map(({ id, title }) => ({name: title, value: id }))
                        }
                    ])
                    .then(updateChoice => {
                        empUpdate.push(updateChoice.role);
                        empUpdate[0] = role
                        empUpdate[1] = empUpdate[0]
                        const sqlChoice = `UPDATE employee SET role_id = (?) WHERE id = (?)`;
                        sqlConnection.query(sqlChoice, empUpdate, (err, data) => {
                            if (err) throw err;
                            console.log('Employee Updated!');
                            allEmployees();
                        })
                    })
                })

            })
})
};

function allRoles() {
    const sqlRoles = `SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;
    sqlConnection.promise().query(sqlRoles, (err, data) => {
        if (err) throw err;
        console.table(data);
        initialPrompt();
    })

};

function addRoles() {
inquirer
.prompt([
    {
        type: 'input',
        name: 'role',
        message: 'What role would you like to add?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is this roles salary?'
    }
])
.then (answers => {
    const roleInfo = [answers.role, answers.salary];
    const newRoleSql = `SELECT name, id FROM department`;
    sqlConnection.promise().query(newRoleSql, (err, data) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'dept',
                message: 'What is the roles department?',
                choices: data.map(({ id, title }) => ({name: title, value: id }))
            }
        ])
        .then (deptSelected => {
            roleInfo.push(deptSelected.dept);
            const roleChartAdd = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?, ?)`;
            sqlConnection.query(roleChartAdd, roleInfo, (err, data) => {
                if (err) throw err;
                console.log('Your Role Was Added!');
                allRoles();
            })

        } )
    })
})
};

function allDepartments() {
const sqlDepartment = `SELECT department.id AS id, department.name AS department FROM department`;
sqlConnection.promise().query(sqlDepartment, (err, data) => {
    if (err) throw err;
    console.table(data);
    initialPrompt();
})
};
function addDepartments() {
inquirer
.prompt([
    {
        type: 'input',
        name: 'addDept',
        message: 'What is the new departments name?'
    }
])
.then (answers => {
    const deptInfo = answers.addDept;
    const newDeptAdd = `INSERT INTO department (name) VALUES (?)`;
    sqlConnection.query(newDeptAdd, deptInfo, (err, data) => {
        if (err) throw err;
        console.log('Your Department Has Been Added');
        allDepartments();
    });
});
};