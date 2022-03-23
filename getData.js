const dbConnect = require('./config/connection');
const conTable = require('console.table')

const promiseConn = dbConnect.promise();
let sql = 'SELECT * FROM department';

function sendQuery(optionVal) {
    // console.log(`in sendquery ${optionVal}`);
    optionVal = optionVal.replace(/\s/g, '');
    // console.log(optionVal);
    promiseConn.query(sql)
        .then((data) => {
            const deptTbl = conTable.getTable(data[0]);
            console.log("\n"+deptTbl);
        })
        .catch(console.log);
};


module.exports = sendQuery;