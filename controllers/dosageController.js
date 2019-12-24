const db = require("../db");
const DosageModel = require("../models/Dosage");

module.exports = {
  getDosagesOptions: function(req, res) {
    try {
      
      let sql = `SELECT DISTINCT Dosage as Amount
                 FROM MedicineDosage 
                 ORDER BY Dosage ASC;`;

      db.connection.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {

          res.json(results);
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
};
