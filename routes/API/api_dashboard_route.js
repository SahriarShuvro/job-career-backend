const express = require("express");
const router = express.Router();

const {
  api_dashboard_get,
} = require("../../controllers/API/DashboardPageAPI/api_dashboard_controller");

// Dashboard API
router.get("/dashboard", api_dashboard_get);
module.exports = router;
