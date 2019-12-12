const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// Import routes
const medicinesRoute = require("./routes/medicine");
const doctorsRoute = require("./routes/doctor");
const dosageRoutes = require("./routes/dosage");
const medicalPlanRoutes = require("./routes/medicalPlan");

// Middlewares
app.use(bodyParser.json());

app.use("/medicine", medicinesRoute);
app.use("/doctor", doctorsRoute);
app.use("/dosage", dosageRoutes);
app.use("/medicalPlan", medicalPlanRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
