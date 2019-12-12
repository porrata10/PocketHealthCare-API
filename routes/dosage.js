const express = require("express");
const router = express();
const dosageController = require("../controllers/dosageController");


router.get("/getDosagesOptions",  dosageController.getDosagesOptions);


module.exports = router;