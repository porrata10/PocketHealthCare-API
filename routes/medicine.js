const express = require("express");
const router = express();
const medicineController = require("../controllers/medicineController");

// Select all information for a particular medicine
router.get(
  "/getMedicineInformation/:id",
  medicineController.getMedicineInformation
);

// Select all medicines
router.get("/getMedicines/", medicineController.getMedicines);

module.exports = router;
