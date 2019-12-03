const mysql = require("mysql");
const { Sequelize } = require("sequelize");

const connection = mysql.createConnection({
  host: "167.99.0.4",
  user: "ricardo.porrata",
  password: "manchester10_10",
  port: "3306",
  database: "PocketHealthCare"
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
