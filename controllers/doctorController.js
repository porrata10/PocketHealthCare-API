const db = require("../db");
const Doctor = require("../models/Doctor");
const MedicalPlan = require("../models/MedicalPlan");

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
  getDoctors: function(req, res) {
    try {
      let sql = `SELECT Name, Specialty FROM Doctors`;

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

  getDoctorInformation: function(req, res) {
    try {
      let sql = `CALL GetDoctorsInformation(${req.params.id})`;

      db.connection.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {
          var dataSet = results[0];
          var DoctorItem = new Doctor();
          var MedicalPlans = new Array(MedicalPlan);

          DoctorItem.Doctors_ID = dataSet[0].DoctorID;
          DoctorItem.Name = dataSet[0].DoctorsName;
          DoctorItem.Specialty = dataSet[0].Specialty;
          DoctorItem.Latitude = dataSet[0].Latitude;
          DoctorItem.Longitude = dataSet[0].Longitude;
          DoctorItem.AddressLine1 = dataSet[0].AddressLine1;
          DoctorItem.AddressLine2 = dataSet[0].AddressLine2;
          DoctorItem.City = dataSet[0].City;
          DoctorItem.State = dataSet[0].State;
          DoctorItem.Country = dataSet[0].Country;
          DoctorItem.PostalCode = dataSet[0].PostalCode;

          dataSet.forEach((element, index, arr) => {
            var MedicalPlanItem = new MedicalPlan();

            MedicalPlanItem.MedicalPlan_ID = element.MedicalPlanID;
            MedicalPlanItem.Name = element.MedicalPlanName;

            MedicalPlans[index] = MedicalPlanItem;
          });

          var result = {
            DoctorsInformation: DoctorItem,
            MedicalPlans: MedicalPlans
          };

          res.json(result);
        }
      });
    } catch (error) {
      res.json({ message: error });
    }
  },

  getDoctorsSearch: function(req, res) {
    try {
      const { specialty = "", city = "", medicalPlan = "" } = req.query;

      let doctorsSearchModel = new Array(Doctor);
      let sql = `CALL DoctorsSearch("${verifyString(specialty)}", "${verifyString(city)}", 
                                    "${verifyString(medicalPlan)}");`;

      db.connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        } else {
          results[0].forEach((element, index, arr) => {
            doctorsSearchModel[index] = element;
          });
          console.log(req.params);
          res.json({ doctorsSearchModel });
        }
      });
    } catch (error) {
      res.json({ error: error });
      console.log(req.params);
    }
  }
};
