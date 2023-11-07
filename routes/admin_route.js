const router = require("express").Router();

const {
  dashboard_c_get,
  job_post_c_get,
  company_c_get,
  blog_c_get,
} = require("../controllers/admin_controllers");

// Dashbord Router
router.get("/", dashboard_c_get);

// Job Post Router
router.get("/job", job_post_c_get);

// Company Router
router.get("/companies", company_c_get);

// Blog Router
router.get("/blogs", blog_c_get);

module.exports = router;
