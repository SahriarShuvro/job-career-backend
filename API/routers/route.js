// Api Routs
const express = require("express");
const router = express.Router();

// Import your API route modules
const { api_dashboard, api_job, api_company, api_blog } = require(".");

// Use the imported route modules
router.use("/admin", api_dashboard);
router.use("/admin", api_job);
router.use("/admin", api_company);
router.use("/admin", api_blog);

module.exports = router;
