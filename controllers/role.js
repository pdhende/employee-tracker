const dbConnect = require('../config/connection');

// Custom promise function to retrieve data of all roles 
const viewRoles = () => new Promise((resolve, reject) => {
    const sql = "SELECT r.id Id, r.title Title, d.name Department, r.salary Salary FROM roles r, department d WHERE r.department_id = d.id";
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

module.exports = { viewRoles };