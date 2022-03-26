const dbConnect = require('../config/connection');

// Custom promise function to retrieve data of all roles 
const viewRoles = () => new Promise((resolve, reject) => {
    const sql = "SELECT r.id Id, r.title Title, d.name Department, r.salary Salary FROM roles r LEFT JOIN department d ON r.department_id = d.id";
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

// Function to add a new role to the database
const addRole = (data) => new Promise((resolve, reject) => {
    
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.name}', ${data.salary}, (SELECT id FROM department WHERE name = '${data.deptName}'))`;

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

module.exports = { viewRoles, addRole};