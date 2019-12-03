const express = require("express");
const router = express();
const doctorController = require("../controllers/doctorController");

// Select all doctors
router.get("/getDoctors/", doctorController.getDoctors);

// Select all information for a particular doctor
router.get("/getDoctorInformation/:id", doctorController.getDoctorInformation);

module.exports = router;
