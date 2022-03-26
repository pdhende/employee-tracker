const inquirer = require('inquirer');
const conTable = require('console.table');
const { viewDept, addDept, deleteDept, viewDeptBudget } = require('./controllers/dept');
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
            'Delete a department',
            'View department budget',
            'Quit'
        ],
    }
];

// Function to present options to the user and based on the user selection perform db operations
function showOptions(quesArr, tbleName, operatn) {
    inquirer.prompt(quesArr)
        .then((answers) => {
            if (tbleName === 'department') {
                if (operatn === 'add') {
                    addDept(answers)
                        .then(() => {
                            console.log('\x1b[32m', `Added a new ${tbleName} : ${answers.name}\n`);
                            showOptions(optionArr, null, null);
                        });
                } else if (operatn === 'delete') {
                    deleteDept(answers)
                        .then(() => {
                            console.log('\x1b[32m', `Deleted ${tbleName} : ${answers.dName}\n`);
                            showOptions(optionArr, null, null);
                        });
                }
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

// Function to invoke promise functions defined in the controllers 
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
        case 'Delete a department':
            let deptName = await viewDept();
            deptName = deptName.map((dept) => dept.name);

            // Questions for delete a department
            const deptQ = [
                {
                    type: "list",
                    name: "dName",
                    message: `Which department do you want to delete?`,
                    choices: deptName,
                },
            ];
            showOptions(deptQ, 'department', 'delete');
            break;
        case 'View department budget':
            let deptBudget = await viewDeptBudget();
            const deptBudTbl = conTable.getTable(deptBudget);
            console.log("\n" + deptBudTbl);
            showOptions(optionArr, null, null);
            break;
        default:
            console.log(`\nThank you for visiting. Have a great day!\n`);
            process.exit();
    };
}

// First call to the function
showOptions(optionArr, null, null);

