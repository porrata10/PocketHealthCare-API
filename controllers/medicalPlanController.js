const db = require("../db");
const MedicalPlanModel = require("../models/MedicalPlan");

module.exports = {
  getMedicalPlanOptions: function(req, res) {
    try {
      let sql = `SELECT * FROM MedicalPlans`;
      let medicalPlanOptions = new Array(MedicalPlanModel);
      db.connection.query(sql, (error, results) => {
        if (error) {
          throw erorr;
        } else {
          results.forEach((element, index, arr) => {
            medicalPlanOptions[index] = element;
          });

          res.json({medicalPlanOptions});
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
};
