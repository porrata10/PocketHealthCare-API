const express = require("express");
const router = express();
const medicineController = require("../controllers/medicineController");

// makes the parameters in query.string not be case sensitive
router.use(function(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

// Select all information for a particular medicine
router.get(
  "/getMedicineInformation/:id",
  medicineController.getMedicineInformation
);

// Select all medicines
router.get("/getMedicines/", medicineController.getMedicines);

// Select all information for a particular medicine
router.get("/getMedicinesSearch", medicineController.getMedicinesSearch);

// Searches for the medicine based on filters
router.get(
  "/getMedicinesSearch/:MedicalPlanName?/:DosageAmount?/:Medicine_Name?/:MedicineCategory?",
  medicineController.getMedicinesSearch
);

module.exports = router;
