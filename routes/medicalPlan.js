const express = require("express");
const router = express();
const medicalPlanController = require("../controllers/medicalPlanController");


router.get("/getMedicalPlanOptions", medicalPlanController.getMedicalPlanOptions);

module.exports = router;


