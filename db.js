const mysql = require("mysql");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: "3306",
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to db");
  }
});

sequelize = new Sequelize("RocketHealthCare", "doadmin", "aqqarcux29jz7m9w", {
  dialect: "mysql"
});

module.exports = {
  connection: connection,

  sequelize: sequelize
};
