const db = require("../db");
const MedicineModel = require("../models/Medicine");
const MedicalPlanDosageForCovertModel = require("../models/MedicalPlanDosageForCovert");
const AdministrationTypeModel = require("../models/AdministrationType");

function verifyString(value = "") {
  if (value === null) {
    return "";
  } else if (typeof value !== "string") {
    return value.toString();
  } else {
    return value;
  }
}

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

          Medicine.MedicineID = dataSet[0].MedicineID;
          Medicine.Name = dataSet[0].MedicineName;
          Medicine.Purpose = dataSet[0].Purpose;
          Medicine.Description = dataSet[0].Description;
          Medicine.Category = dataSet[0].Category;

          dataSet.forEach((element, index, arr) => {
            var MedicalPlanDosageForCovertItem = new MedicalPlanDosageForCovertModel();
            var AdministrationTypeItem = new AdministrationTypeModel();

            MedicalPlanDosageForCovertItem.DosageAmount = element.DosageAmount;
            MedicalPlanDosageForCovertItem.MedicalPlanCovertID =
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
              MedicalPlanCovert_ID: item.MedicalPlanCovertID,
              MedicalPlan: item.MedicalPlan,
              Covert: item.Covert,
              DosageAmount: item.DosageAmount
            })),
            AdministrationType: AdministrationTypeList
          };

          res.json(result);
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  },

  medicineSearch: function(req, res) {
    try {
      const sortCriteriasEnum = {
        med: "Medicine_Name",
        cat: "MedicineCategory"
      };

      const { plan = "", dose = "", med = "", cat = "", sort = "" } = req.query;

      const sortBy = sortCriteriasEnum[verifyString(sort).toLowerCase()];

      let medicineOptionsModel = new Array(MedicineModel);
      let sql = `CALL MedicineSearch("${verifyString(plan)}", "${verifyString(dose)}", 
                                     "${verifyString(sortBy)}" )`;

      db.connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        } else {
          results[0].forEach((element, index, arr) => {
            medicineOptionsModel[index] = element;
          });
          
          res.json({ Medicines: medicineOptionsModel });
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
};
