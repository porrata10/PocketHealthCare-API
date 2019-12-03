const db = require("../db");
const MedicineModel = require("../models/Medicine");
const MedicalPlanDosageForCovertModel = require("../models/MedicalPlanDosageForCovert");
const AdministrationTypeModel = require("../models/AdministrationType");

module.exports = {
  getMedicines: function(req, res) {
    try {
      let sql = `SELECT Name, Description FROM Medicine`;

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
  },

  getMedicineInformation: function(req, res) {
    try {
      let sql = `CALL GetMedicineInformation(${req.params.id});`;

      db.connection.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {
          const Medicine = new MedicineModel();
          const MedicalPlanDosageForCovertList = new Array(
            MedicalPlanDosageForCovertModel
          );
          const AdministrationTypeList = new Array(AdministrationTypeModel);
          const dataSet = results[0];

          Medicine.Medicine_ID = dataSet[0].Medicine_ID;
          Medicine.Name = dataSet[0].MedicineName;
          Medicine.Purpose = dataSet[0].Purpose;
          Medicine.Description = dataSet[0].Description;
          Medicine.Category = dataSet[0].Category;

          dataSet.forEach((element, index, arr) => {
            var MedicalPlanDosageForCovertItem = new MedicalPlanDosageForCovertModel();
            var AdministrationTypeItem = new AdministrationTypeModel();

            MedicalPlanDosageForCovertItem.Dosage_ID = element.DosageID;
            MedicalPlanDosageForCovertItem.Amount = element.DosageAmount;
            MedicalPlanDosageForCovertItem.MedicalPlanCovert_ID =
              element.MedicalPlanCovertID;
            MedicalPlanDosageForCovertItem.MedicalPlan = element.MedicalPlan;
            MedicalPlanDosageForCovertItem.Covert = element.Covert;

            MedicalPlanDosageForCovertList[
              index
            ] = MedicalPlanDosageForCovertItem;

            let foundIndex = AdministrationTypeList.findIndex(
              x => x.AdministrationType_ID == element.AdministrationTypeID
            );

            if (foundIndex === -1) {
              AdministrationTypeItem.AdministrationType_ID =
                element.AdministrationTypeID;
              AdministrationTypeItem.Name = element.AdministrationTypeName;

              AdministrationTypeList[index] = AdministrationTypeItem;
            }
          });

          var result = {
            MedicineInformation: Medicine,
            MedicalPlanDosage: MedicalPlanDosageForCovertList.map(item => ({
              Dosage_ID: item.Dosage_ID,
              Amount: item.Amount,
              MedicalPlanCovert_ID: item.MedicalPlanCovert_ID,
              MedicalPlan: item.MedicalPlan,
              Covert: item.Covert
            })),
            AdministrationType: AdministrationTypeList
          };

          res.json(result);
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
};
