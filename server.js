const inquirer = require('inquirer');
const { viewDept, viewRoles, addData } = require('./getData');
const conTable = require('console.table');

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
            'Update an employee role',
            'Quit'
        ],
    }
];

// Function to present options to the user
function showOptions(quesArr, tbleName) {
    inquirer.prompt(quesArr)
        .then((answers) => {

            if (tbleName !== null) {
                addData(answers, tbleName)
                .then(() => {
                    console.log('\x1b[32m', `Added a new ${tbleName} : ${answers.name}\n`);
                    showOptions(optionArr);
                });
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
                console.log("\n" + deptTbl);
                showOptions(optionArr, null);
            });
            break;
        case 'View all roles':
            viewRoles.then((results) => {
                const deptTbl = conTable.getTable(results);
                console.log("\n" + deptTbl);
                showOptions(optionArr, null);
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
                deptnames = deptnames.map((dept) => dept.name);

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
                showOptions(roleQues,'roles');
            });
            break;
        default:
            console.log('\x1b[35m', `\nThank you for visiting. Have a great day!`);
            break;
    };
}

// First call to the function
showOptions(optionArr, null);

