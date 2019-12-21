const express = require("express");
const router = express();
const doctorController = require("../controllers/doctorController");

// makes the parameters in query.string not be case sensitive
router.use(function(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

// Select all doctors
router.get("/getDoctors/", doctorController.getDoctors);

// Select all information for a particular doctor
router.get("/getDoctorInformation/:id", doctorController.getDoctorInformation);

// Searches for the doctors based on filters
router.get(
  "/doctorSearch/:specialty?/:city?/:plan?",
  doctorController.doctorSearch
);

module.exports = router;
