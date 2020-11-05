const dbconfig= require('./config/dbconfig.js')
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: dbconfig.hostName,
    user: dbconfig.userName,
    password: dbconfig.password,
    database: dbconfig.dbName
  });

  module.exports = connection;
  //Establish the server connection