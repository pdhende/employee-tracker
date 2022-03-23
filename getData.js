const dbConnect = require('./config/connection');

const promiseConn = dbConnect.promise();
let sql = 'SELECT * FROM department';

function sendQuery(optionVal) {
    console.log(`in sendquery ${optionVal}`);
    optionVal = optionVal.replace(/\s/g, '');
    console.log(optionVal);
    promiseConn.query(sql)
        .then((data) => {
            console.log(data[0]);
        });
}


module.exports = sendQuery;