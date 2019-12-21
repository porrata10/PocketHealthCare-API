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

// Searches for the medicine based on filters
router.get(
  "/medicineSearch/:plan?/:dose?/:sort?",
  medicineController.medicineSearch
);

module.exports = router;
