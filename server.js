const inquirer = require('inquirer');
const { viewRoles, addData, viewEmployee } = require('./getData');
const conTable = require('console.table');
const { viewDept, addDept } = require('./controllers/dept');

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
            const empRes = await viewEmployee();
            const empTbl = conTable.getTable(empRes);
            console.log("\n" + empTbl);
            showOptions(optionArr, null);
            // viewEmployee();
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
        case 'Add an employee':
            // Get the role titles from roles table
            let roleNames = await viewRoles();
            // console.log(roleNames);
            roleNames = roleNames.map((role) => role.Title);

            // Get the employee names 
            let empNames = await viewEmployee();
            // console.log(empNames);
            empNames = empNames.map((ename) => ename.First_Name.concat(' ',ename.Last_Name));
            empNames.unshift('None');

            // Questions for adding a new role
            const empQues = [
                {
                    type: "input",
                    name: "fname",
                    message: `What is the employee's first name?`,
                },
                {
                    type: "input",
                    name: "lname",
                    message: `What is the employee's last name?`,
                },
                {
                    type: "list",
                    name: "empRole",
                    message: `What is the employee's role?`,
                    choices: roleNames,
                },
                {
                    type: "list",
                    name: "empManager",
                    message: `Who is the employee's manager?`,
                    choices: empNames,
                }
            ];
            showOptions(empQues, 'employee');
            break;
        default:
            console.log('\x1b[35m', `\nThank you for visiting. Have a great day!`);
            break;
    };
}

// First call to the function
showOptions(optionArr, null);

