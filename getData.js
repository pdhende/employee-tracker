const dbConnect = require('./config/connection');
const conTable = require('console.table');

const promiseConn = dbConnect.promise();

const viewDept = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM department";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});

const viewRoles = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM roles";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});

const getDeptName = new Promise((resolve, reject) => {
    const sql = "SELECT name FROM department";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});

module.exports = { viewDept, viewRoles, getDeptName };