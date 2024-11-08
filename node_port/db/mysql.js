require('dotenv').config();
const debug = require('debug')('app:mysql.js');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

connection.connect(()=>{
    debug("DB Connected");
});

connection.on('error', err => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // db error reconnect
      //mysql.disconnect_handler();
      connection.connect();
  } else {
      throw err;
  }
});

module.exports = connection;