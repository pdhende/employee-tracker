const dbConnect = require('../config/connection');

// Custom promise function to retrieve data of all departments 
const viewDept = () => new Promise((resolve, reject) => {
    const sql = "SELECT * FROM department";
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

// Function to add new department to the database
const addDept = (data) => new Promise((resolve, reject) => {

    const sql = `INSERT INTO department (name) VALUES (?)`;

    dbConnect.query(sql, [data.name])
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Function to delete department from the database
const deleteDept = (data) => new Promise((resolve, reject) => {

    const sql = `DELETE FROM department WHERE name = '${data.dName}'`;

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

// Function to display the total budget utilized by each department
const viewDeptBudget = (data) => new Promise((resolve, reject) => {

    const sql = `SELECT  d.name Department, SUM(r.salary) Total_Util_Budget
    FROM employee emp
    LEFT JOIN roles r ON emp.role_id = r.id
    JOIN department d ON r.department_id = d.id
    GROUP BY d.name`;

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


module.exports = { viewDept, addDept, deleteDept, viewDeptBudget };