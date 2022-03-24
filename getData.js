const dbConnect = require('./config/connection');
const conTable = require('console.table');

const promiseConn = dbConnect.promise();


const viewDept = new Promise((resolve, reject) => {
        const sql = "SELECT * FROM department";
        dbConnect.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            // console.log(results);
                        // const deptTbl = conTable.getTable(results);
                        // console.log("\n\n" + deptTbl);
            // console.log("HI");
            // console.log(results);
            resolve(results);
        });
    });

const viewRoles = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM roles";
    dbConnect.query(sql, (err, results) => {
        if (err) {
            return reject(err);
        }
        // console.log(results);
                    // const deptTbl = conTable.getTable(results);
                    // console.log("\n\n" + deptTbl);
        // console.log("HI");
        // console.log(results);
        resolve(results);
    });
});


// const sendQuery = (optionVal) => {
//     return new Promise((resolve, reject) => {
//         promiseConn.query(sql, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         });
//         //     .then((data) => {
//         //         const deptTbl = conTable.getTable(data[0]);
//         //         console.log("\n" + deptTbl);
//         //     })
//         //     .catch(err => {
//         //         console.log
//         //     });
//         // // const functionName = optionVal.replace(/\s/g, '');
//         // if (err) {
//         //     return reject(err);
//         // }
//         // resolve(data);
//     });
// }
// let sql = 'SELECT * FROM department';

// function sendQuery(optionVal) {
//     // console.log(`in sendquery ${optionVal}`);
//     optionVal = optionVal.replace(/\s/g, '');
//     // console.log(optionVal);
//     promiseConn.query(sql)
//         .then((data) => {
//             const deptTbl = conTable.getTable(data[0]);
//             console.log("\n"+deptTbl);
//         })
//         .catch(err => {
//             console.log
//         });

// };

// fs.readFile(fileName, encoding, (err, data) => {
//     if (err) {
//         return reject(err);
//     }

//     resolve(data);
// });


module.exports = { viewDept, viewRoles};