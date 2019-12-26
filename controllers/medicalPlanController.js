const db = require("../db");
const MedicalPlanModel = require("../models/MedicalPlan");

module.exports = {
  getMedicalPlanOptions: function(req, res) {
    try {

      let medicalPlans = new Array(MedicalPlanModel)
      let sql = `SELECT DISTINCT *
                 FROM MedicalPlans 
                 ORDER BY Name ASC`;

      db.connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        } else {
results.forEach(element, index, array => {
  medicalPlans[index] = element;
});

          res.json(medicalPlans);
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
};
