const express = require("express");
const router = express.Router();

const {
  // Job post ***
  api_job_post_get,
  api_job_post_post,
  // single job
  api_single_job_post,
  api_update_job_post,
  api_delete_job_post,
} = require("../../controllers/API/JobPageAPI/api_job_controller");

const {
  // Category ***
  api_category_get,
  api_category_post,
  //single category
  api_single_category_get,
  api_single_category_post,
  api_single_category_patch,
} = require("../../controllers/API/JobPageAPI/api_category_controller");

const {
  // Employment Status ***
  api_employment_status_get,
  api_employment_status_post,
  // Single
  api_single_employment_status_get,
  api_single_employment_status_post,
  api_single_employment_status_patch,
} = require("../../controllers/API/JobPageAPI/api_employment_status");

const {
  // Gender ***
  api_gender_get,
  api_gender_post,
  // Single
  api_single_gender_get,
  api_single_gender_post,
  api_single_gender_patch,
} = require("../../controllers/API/JobPageAPI/api_gender_controller");

const {
  // Industry ***
  api_industry_get,
  api_industry_post,
  // Single
  api_single_industry_get,
  api_single_industry_post,
  api_single_industry_patch,
} = require("../../controllers/API/JobPageAPI/api_industry_controller");

const {
  // Qualification ***
  api_qualification_get,
  api_qualification_post,
  // Single
  api_single_qualification_get,
  api_single_qualification_post,
  api_single_qualification_patch,
} = require("../../controllers/API/JobPageAPI/api_qualification_controller");

// Job Section API *** //
// Job Post
router.route("/job").get(api_job_post_get).post(api_job_post_post);

router
  .route("/job/:id")
  .get(api_single_job_post)
  .patch(api_update_job_post)
  .delete(api_delete_job_post);

// Job Category
router.route("/job-categories/").get(api_category_get).post(api_category_post);
// Single
router
  .route("/job-categories/:id")
  .get(api_single_category_get)
  .post(api_single_category_post)
  .patch(api_single_category_patch);

// Qualification
router
  .route("/job-qualification/")
  .get(api_qualification_get)
  .post(api_qualification_post);
// Single
router
  .route("/job-qualification/:id")
  .get(api_single_qualification_get)
  .post(api_single_qualification_post)
  .patch(api_single_qualification_patch);

//  Employment Status
router
  .route("/job-employment-status/")
  .get(api_employment_status_get)
  .post(api_employment_status_post);
// Single
router
  .route("/job-employment-status/:id")
  .get(api_single_employment_status_get)
  .post(api_single_employment_status_post)
  .patch(api_single_employment_status_patch);

//  Industry
router.route("/job-industry/").get(api_industry_get).post(api_industry_post);
// Single
router
  .route("/job-industry/:id")
  .get(api_single_industry_get)
  .post(api_single_industry_post)
  .patch(api_single_industry_patch);

//  Gender
router.route("/job-gender/").get(api_gender_get).post(api_gender_post);
// Single
router
  .route("/job-gender/:id")
  .get(api_single_gender_get)
  .post(api_single_gender_post)
  .patch(api_single_gender_patch);

// Job Section API End *** //

module.exports = router;
