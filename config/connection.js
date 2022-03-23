const mysql = require('mysql2');

// Set connection to the database
const dbConnect = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'happyday',
      database: 'company_db'
    },
    console.log('Connected to the Company database')
  );

  module.exports = dbConnect;