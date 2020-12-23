const mysql = require("mysql");
require("dotenv").config();
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) {
    console.log("Connection database error!" + err);
  } else {
    console.log("Connection database success!");
  }
});

module.exports = conn;
