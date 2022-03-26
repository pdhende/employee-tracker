const dbConnect = require('../config/connection');

// Custom promise function to retrieve data of all roles 
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

module.exports = { viewEmployee };