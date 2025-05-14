// config/database.js
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "prnv_services"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = connection;
