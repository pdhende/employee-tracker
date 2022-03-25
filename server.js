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
                        showOptions(optionArr, null);
                    });
            } else {
                sendQuery(answers.optionVal);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

// Function to invoke functions based on the user selection
async function sendQuery(val) {
    switch (val) {
        case 'View all departments':
            const deptRes = await viewDept();
            const deptTbl = conTable.getTable(deptRes);
            console.log("\n" + deptTbl);
            showOptions(optionArr, null);
            break;
        case 'View all roles':
            const roleRes = await viewRoles();
            const roleTbl = conTable.getTable(roleRes);
            console.log("\n" + roleTbl);
            showOptions(optionArr, null);
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
            showOptions(deptQues, 'department');
            break;
        case 'Add a role':
                let deptNames = await viewDept();
                deptNames = deptNames.map((dept) => dept.name);

                // Questions for adding a new role
                const roleQues = [
                    {
                        type: "input",
                        name: "name",
                        message: `What is the name of the role?`,
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: `What is the salary of the role?`,
                    },
                    {
                        type: "list",
                        name: "deptName",
                        message: `Which department does the role belong to?`,
                        choices: deptNames,
                    }
                ];
                showOptions(roleQues, 'roles');
            break;
        default:
            console.log('\x1b[35m', `\nThank you for visiting. Have a great day!`);
            break;
    };
}

// First call to the function
showOptions(optionArr, null);

