const express = require("express");
const router = express.Router();
// Controllers Import
const {
  // Job post ***
  api_job_post_get,
  api_job_post_post,
  // single job
  api_single_job_post,
  api_update_job_post,
  api_single_job_activate_inactivate,
  api_delete_job_post,
} = require("../controllers/job/");

const {
  // Category ***
  api_category_get,
  api_category_post,
  //single category
  api_single_category_get,
  api_single_category_post,
  api_single_category_edit,
  api_single_category_activate_inactivate,
  api_single_category_delete,
} = require("../controllers/job/categories");

const {
  // Qualification ***
  api_qualification_get,
  api_qualification_post,
  // Single
  api_single_qualification_get,
  api_single_qualification_post,
  api_single_qualification_edit,
  api_single_qualification_activate_inactivate,
  api_single_qualification_delete,
} = require("../controllers/job/qualification");

const {
  // Employment Status ***
  api_employment_status_get,
  api_employment_status_post,
  // Single
  api_single_employment_status_get,
  api_single_employment_status_post,
  api_single_employment_status_edit,
  api_single_employment_status_activate_inactivate,
  api_single_employment_status_delete,
} = require("../controllers/job/employmentStatus");

const {
  // Industry ***
  api_industry_get,
  api_industry_post,
  // Single
  api_single_industry_get,
  api_single_industry_post,
  api_single_industry_edit,
  api_single_industry_activate_inactivate,
  api_single_industry_delete,
} = require("../controllers/job/industry");

// Middleware Import
const validateJob = require("../middleware/job/");
const validateJobCategory = require("../middleware/job/category");

// Job Section API *** //
// Job Post
router.route("/job").get(api_job_post_get).post(validateJob, api_job_post_post);

router
  .route("/job/:id")
  .get(api_single_job_post)
  .patch(validateJob, api_update_job_post)
  .put(api_single_job_activate_inactivate)
  .delete(api_delete_job_post);

// Job Category
router
  .route("/job-categories/")
  .get(api_category_get)
  .post(validateJobCategory, api_category_post);
// Single
router
  .route("/job-categories/:id")
  .get(api_single_category_get)
  .post(api_single_category_post)
  .patch(validateJobCategory, api_single_category_edit)
  .put(api_single_category_activate_inactivate)
  .delete(api_single_category_delete);

// Qualification
router
  .route("/job-qualification/")
  .get(api_qualification_get)
  .post(validateJobCategory, api_qualification_post);
// Single
router
  .route("/job-qualification/:id")
  .get(api_single_qualification_get)
  .post(api_single_qualification_post)
  .patch(validateJobCategory, api_single_qualification_edit)
  .put(api_single_qualification_activate_inactivate)
  .delete(api_single_qualification_delete);

//  Employment Status
router
  .route("/job-employment-status/")
  .get(api_employment_status_get)
  .post(validateJobCategory, api_employment_status_post);
// Single
router
  .route("/job-employment-status/:id")
  .get(api_single_employment_status_get)
  .post(api_single_employment_status_post)
  .patch(validateJobCategory, api_single_employment_status_edit)
  .put(api_single_employment_status_activate_inactivate)
  .delete(api_single_employment_status_delete);

//  Industry
router
  .route("/job-industry/")
  .get(api_industry_get)
  .post(validateJobCategory, api_industry_post);
// Single
router
  .route("/job-industry/:id")
  .get(api_single_industry_get)
  .post(api_single_industry_post)
  .patch(validateJobCategory, api_single_industry_edit)
  .put(api_single_industry_activate_inactivate)
  .delete(api_single_industry_delete);

// Job Section API End *** //

module.exports = router;
