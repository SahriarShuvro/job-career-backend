// Api Routs
const express = require("express");
const router = express.Router();

// Import your API route modules
const api_dashboard = require("./api_dashboard_route");
const api_job = require("./api_job_route");
const api_company = require("./api_company_route");
const api_blog = require("./api_blog_route");

// Use the imported route modules
router.use("/admin", api_dashboard);
router.use("/admin", api_job);
router.use("/admin", api_company);
router.use("/admin", api_blog);

module.exports = router;
