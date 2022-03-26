const dbConnect = require('../config/connection');
const conTable = require('console.table');

// Custom promise function to retrive data of all departments 
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

module.exports = { viewDept, addDept };