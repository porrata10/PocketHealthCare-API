const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Import routes
const medicinesRoute = require("./routes/medicine");
const doctorsRoute = require("./routes/doctor");

// Middlewares
app.use(bodyParser.json());

app.use("/medicine", medicinesRoute);
app.use("/doctor", doctorsRoute);

app.listen("3000", () => {
  console.log("Server running");
});
