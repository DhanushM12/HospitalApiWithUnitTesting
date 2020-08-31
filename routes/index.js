const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients_controller");
const passport = require("passport");

router.use("/doctors", require("./doctors"));
router.use("/patients", require("./patients"));
router.get(
  "/reports/:status",
  passport.authenticate("jwt", { session: false }),
  patientsController.getReportsByStatus
);

module.exports = router;
