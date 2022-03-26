const inquirer = require('inquirer');
const conTable = require('console.table');
const { viewDept, addDept } = require('./controllers/dept');
const { viewRoles, addRole } = require('./controllers/role');
const { viewEmployee, addEmp, updEmp } = require('./controllers/employee');

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
function showOptions(quesArr, tbleName, operatn) {
    inquirer.prompt(quesArr)
        .then((answers) => {
            if (tbleName === 'department') {
                addDept(answers)
                    .then(() => {
                        console.log('\x1b[32m', `Added a new ${tbleName} : ${answers.name}\n`);
                        showOptions(optionArr, null, null);
                    });
            } else if (tbleName === 'role') {
                addRole(answers)
                    .then(() => {
                        console.log('\x1b[32m', `Added a new ${tbleName} : ${answers.name}\n`);
                        showOptions(optionArr, null, null);
                    });
            } else if (tbleName === 'employee') {
                if (operatn === 'add') {
                    addEmp(answers)
                    .then(() => {
                        console.log('\x1b[32m', `Added a new ${tbleName} : ${answers.fname} ${answers.lname}\n`);
                        showOptions(optionArr, null, null);
                    });
                    
                } else if (operatn === 'update') {
                    updEmp(answers)
                    .then(() => {
                        console.log('\x1b[32m', `Updated ${answers.empName}'s role to ${answers.eRole}\n`);
                        showOptions(optionArr, null, null);
                    });
                }
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
            showOptions(optionArr, null, null);
            break;
        case 'View all roles':
            const roleRes = await viewRoles();
            const roleTbl = conTable.getTable(roleRes);
            console.log("\n" + roleTbl);
            showOptions(optionArr, null, null);
            break;
        case 'View all employees':
            const empRes = await viewEmployee();
            const empTbl = conTable.getTable(empRes);
            console.log("\n" + empTbl);
            showOptions(optionArr, null, null);
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
            showOptions(deptQues, 'department', 'add');
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
            showOptions(roleQues, 'role', 'add');
            break;
        case 'Add an employee':
            // Get the role titles from roles table
            let roleNames = await viewRoles();
            roleNames = roleNames.map((role) => role.Title);

            // Get the employee names 
            let empNames = await viewEmployee();
            empNames = empNames.map((ename) => ename.First_Name.concat(' ', ename.Last_Name));
            empNames.unshift('None');

            // Questions for adding a new employee
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
            showOptions(empQues, 'employee', 'add');
            break;
        case 'Update an employee role':
            let eNames = await viewEmployee();
            eNames = eNames.map((ename) => ename.First_Name.concat(' ', ename.Last_Name));

            let rNames = await viewRoles();
            rNames = rNames.map((role) => role.Title);

            // Questions for updating an employees role
            const empUpQues = [
                {
                    type: "list",
                    name: "empName",
                    message: `Which employee's role do you want to update?`,
                    choices: eNames,
                },
                {
                    type: "list",
                    name: "eRole",
                    message: `Which role do you want to assign the selected employee?`,
                    choices: rNames,
                }
            ];
            showOptions(empUpQues, 'employee', 'update');
            break;
        default:
            console.log('\x1b[35m', `\nThank you for visiting. Have a great day!`);
            break;
    };
}

// First call to the function
showOptions(optionArr, null, null);

