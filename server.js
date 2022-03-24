const express = require('express');
const inquirer = require('inquirer');
const { viewDept, viewRoles } = require('./getData');
const conTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Array of options for user to view/update company database
const optionArr = [
    {
        type: "list",
        name: "optionVal",
        message: `What would you like to do?`,
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ],
    }
];

// Questions for adding new department
const deptQues = [
    {
        type: "input",
        name: "deptName",
        message: `What is the name of the department?`,
    }
];

// Function to present options to the user
function showOptions(quesArr) {
    inquirer.prompt(quesArr)
        .then((answers) => {
            console.log(answers.optionVal);
            sendQuery(answers.optionVal);
        });
};

// Function to invoke functions based on the user selection
function sendQuery(val) {
    switch (val) {
            case 'View all departments':
                viewDept.then((results) => {
                    const deptTbl = conTable.getTable(results);
                    console.log("\n\n" + deptTbl);
                    showOptions(optionArr);
                });
                break;
            case 'View all roles':
                viewRoles.then((results) => {
                    const deptTbl = conTable.getTable(results);
                    console.log("\n\n" + deptTbl);
                    showOptions(optionArr);
                });
                break;
            case 'View all employees':
                viewEmployee();
                break;
            case 'Add a department':
                showOptions(deptQues);
                break;
            default:
                console.log(`Sorry invalid choice`);
        };
}

// First call to the function
showOptions(optionArr);

