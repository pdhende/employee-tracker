const dbConnect = require('../config/connection');

// Custom promise function to retrieve data of all employees 
const viewEmployee = () => new Promise((resolve, reject) => {
    const sql = `SELECT emp.id Id, emp.first_name First_Name, emp.last_name Last_Name, r.title Title, d.name Department, r.salary Salary, concat(e.first_name, ' ', e.last_name) Manager
    FROM employee emp
    JOIN roles r ON emp.role_id = r.id
    LEFT JOIN employee e ON emp.manager_id = e.id
    JOIN department d ON r.department_id = d.id`;
    dbConnect.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Function to add a new employee to the database
const addEmp = (data) => new Promise((resolve, reject) => {
    
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.fname}', '${data.lname}', (SELECT id from (SELECT * FROM roles) tempRoles  where title = '${data.empRole}'), (SELECT id from (SELECT * FROM employee) tempEmp  where CONCAT(first_name, ' ', last_name) = '${data.empManager}'));`

    dbConnect.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Function to add a new employee to the database
const updEmp = (data) => new Promise((resolve, reject) => {
    
    const sql = `UPDATE employee SET role_id = (SELECT id from (SELECT * FROM roles) tempRoles WHERE title = '${data.eRole}')  WHERE CONCAT(first_name, ' ', last_name) = '${data.empName}'`;

    dbConnect.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

module.exports = { viewEmployee, addEmp, updEmp };