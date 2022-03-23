const dbConnect = require('./config/connection');

let Viewalldepartments = 'SELECT * FROM departments';

function sendQuery(optionVal) {
    console.log(`in sendquery ${optionVal}`);
    
}

module.exports = sendQuery;