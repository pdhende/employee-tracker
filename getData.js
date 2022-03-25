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
    const sql = "SELECT * FROM roles";
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
    
        console.log(data);
        str1 = `INSERT INTO ${tblName}`;
        // console.log(sql1)
        if(tblName === 'department') {
            console.log("inside if");
            str2 = ` (name)`;
        }
        str3 = ` VALUES ('${data.name}')`;
        const sql = str1+str2+str3;
        console.log(sql);
        dbConnect.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = { viewDept, viewRoles, addData };