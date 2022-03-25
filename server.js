const express = require('express');
const inquirer = require('inquirer');
const { viewDept, viewRoles, addData } = require('./getData');
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

// // Questions for adding new department
// const deptQues = [
//     {
//         type: "input",
//         name: "deptName",
//         message: `What is the name of the department?`,
//     }
// ];

// // // Questions for adding a new role
// const roleQues = [
//     {
//         type: "input",
//         name: "deptRole",
//         message: `Which department does the role belong to?`,
//         choices: deptnames,
//     }
// ];


// Function to present options to the user
function showOptions(quesArr, tbleName) {
    inquirer.prompt(quesArr)
        .then((answers) => {
            console.log(answers);
            console.log(answers.optionVal);
            if (tbleName === 'department') {
                console.log("Inside dept");
                addData(answers, tbleName)
                .then(() => {
                    console.log('\x1b[32m', `Added the new department : ${answers.name}`);
                    showOptions(optionArr);
                });
                // sendQuery(answers.name);
            } else {
                sendQuery(answers.optionVal);
            }
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
            // Questions for adding new department
            const deptQues = [
                {
                    type: "input",
                    name: "name",
                    message: `What is the name of the department?`,
                }
            ];
            showOptions(deptQues,'department');
            break;
        case 'Add a role':
            viewDept.then((results) => {
                let deptnames = results;
                // console.log(deptnames);
                deptnames = deptnames.map((dept) => dept.name);
                // console.log(deptnames);
                // Questions for adding a new role
                const roleQues = [
                    {
                        type: "input",
                        name: "roleName",
                        message: `What is the name of the role?`,
                    },
                    {
                        type: "number",
                        name: "roleSal",
                        message: `What is the salary of the role?`,
                    },
                    {
                        type: "list",
                        name: "deptRole",
                        message: `Which department does the role belong to?`,
                        choices: deptnames,
                    }
                ];
                // roleQues[0].choices = deptnames;
                // console.log(roleQues);
                showOptions(roleQues);
            });
            break;
        default:
            console.log(`Sorry invalid choice`);
    };
}

// First call to the function
showOptions(optionArr, null);

