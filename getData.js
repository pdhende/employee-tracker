const dbConnect = require('./config/connection');
const conTable = require('console.table');

const promiseConn = dbConnect.promise();

// Custom promise function to retrive data of all departments 
const viewDept = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM department";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});

// Custom promise function to retrive data of all roles 
const viewRoles = new Promise((resolve, reject) => {
    const sql = "SELECT r.id, r.title, d.name department, r.salary FROM roles r, department d WHERE r.department_id = d.id";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
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

            // INSERT INTO roles (title, salary, department_id) VALUES ('Customer Service', 60000, (SELECT id FROM department WHERE name = 'Service'));
        }

        const sql = str1 + str2 + str3;
        console.log(sql);
        promiseConn.query(sql)
            .then((data) => {
                console.log(data[0]);
                    if (data[0]) {
                        resolve();
                    }
                    else {
                     reject();
                    }
                });
                // console.log(rows);
            });
        // dbConnect.query(sql, (err, results) => {
        //     if (err) {
        //         return reject(err);
        //     }
        //     resolve(results);
        // });
    };

    module.exports = { viewDept, viewRoles, addData };