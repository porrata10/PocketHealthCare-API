const db = require("../db");
const MedicalPlanModel = require("../models/MedicalPlan");

module.exports = {
  getMedicalPlanOptions: function(req, res) {
    try {
      let sql = `SELECT DISTINCT Name as MedicalPlan
                 FROM MedicalPlans 
                 ORDER BY Name ASC`;

      db.connection.query(sql, (error, results) => {
        if (error) {
          throw erorr;
        } else {
          res.json(results);
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
};
