const db = require("../db");
const DosageModel = require("../models/Dosage");

module.exports = {
  getDosagesOptions: function(req, res) {
    try {
      
      let sql = `SELECT DISTINCT Dosage as Amount
                 FROM MedicineDosage 
                 ORDER BY Dosage ASC;`;
      let dosageOptions = new Array(DosageModel);

      db.connection.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {

          console.log({list: results});
          results.forEach((element, index, arr) => {
            dosageOptions[index] = (element);
        
          });

          res.json({dosageOptions});
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
};
