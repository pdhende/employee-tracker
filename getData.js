const dbConnect = require('./config/connection');
const conTable = require('console.table');

const promiseConn = dbConnect.promise();

// Custom promise function to retrive data of all departments 
const viewDept = () => new Promise((resolve, reject) => {
    const sql = "SELECT * FROM department";
    promiseConn.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Custom promise function to retrive data of all roles 
const viewRoles = () => new Promise((resolve, reject) => {
    const sql = "SELECT r.id Id, r.title Title, d.name Department, r.salary Salary FROM roles r, department d WHERE r.department_id = d.id";
    promiseConn.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Custom promise function to retrive data of all roles 
const viewEmployee = () => new Promise((resolve, reject) => {
    const sql = `SELECT emp.id Id, emp.first_name First_Name, emp.last_name Last_Name, r.title Title, d.name Department, r.salary Salary, concat(e.first_name, ' ', e.last_name) Manager
    FROM employee emp
    JOIN roles r ON emp.role_id = r.id
    LEFT JOIN employee e ON emp.manager_id = e.id
    JOIN department d ON r.department_id = d.id`;
    promiseConn.query(sql)
        .then((results) => {
            if (results) {
                resolve(results[0]);
            }
            else {
                reject();
            }
        });
});

// Generic promise function to insert data into database
const addData = function (data, tblName) {
    return new Promise((resolve, reject) => {
        let str1, str2, str3;

        str1 = `INSERT INTO ${tblName}`;

        if (tblName === 'department') {
            str2 = ` (name)`;
            str3 = ` VALUES ('${data.name}')`;
        }
        else if (tblName === 'roles') {
            str2 = ` (title, salary, department_id)`;
            str3 = ` VALUES ('${data.name}', ${data.salary}, (SELECT id FROM department WHERE name = '${data.deptName}'))`;
        }

        const sql = str1 + str2 + str3;
        // console.log(sql);
        promiseConn.query(sql)
            .then((data) => {
                // console.log(data[0]);
                if (data[0]) {
                    resolve();
                }
                else {
                    reject();
                }
            });
    });
};

module.exports = { viewDept, viewRoles, addData, viewEmployee};