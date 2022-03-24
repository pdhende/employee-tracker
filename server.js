const express = require('express');
const inquirer = require('inquirer');
const { viewDept, viewRoles } = require('./getData');
const conTable = require('console.table');

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
function showOptions() {
    inquirer.prompt(optionArr)
        .then((answers) => {
            switch (answers.optionVal) {
                case 'View all departments':
                  viewDept.then((results) => {
                    const deptTbl = conTable.getTable(results);
                    console.log("\n\n" + deptTbl);
                    //   console.log("In then");
                    showOptions();
                    });
                  break;
                case 'View all roles':
                    viewRoles.then((results) => {
                        const deptTbl = conTable.getTable(results);
                        console.log("\n\n" + deptTbl);
                        //   console.log("In then");
                            showOptions();
                        });
                    break;
                case 'View all employees':
                    viewEmployee();
                    break;
                default:
                  console.log(`Sorry invalid choice`);
              };
            // console.log(answers);
            // console.log(sq);
            // getData(answers.optionVal)
            // .then((results) => {
            //     const deptTbl = conTable.getTable(results);
            //     console.log("\n" + deptTbl);
            //     showOptions();
            // });
            // console.log("Query done!");
        })
        // .then((results) => {
        //     console.log(results);
        //         const deptTbl = conTable.getTable(results);
        //         console.log("\n" + deptTbl);
        //         showOptions();
        //     });
};

// Call function
showOptions();

