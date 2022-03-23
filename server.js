const express = require('express');
const inquirer = require('inquirer');
const getData = require('./getData');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Array of options for user to view/update company database
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

// Function to present options to the user
function init() {
    inquirer.prompt(optionArr).then((answers) => {
        // console.log(answers);
        // console.log(sq);
        getData(answers.optionVal);
    });
};

// Call function
init();

