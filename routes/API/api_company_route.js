const express = require("express");
const router = express.Router();

const {
  // Company
  api_company_get,
  api_company_post,
  api_company_patch,
  // Single
  api_single_company_get,
  api_single_company_post,
  api_single_company_patch,
} = require("../../controllers/API/CompanyPageAPI/api_company_controller");

const {
  // Category
  api_company_c_get,
  api_company_c_post,
  api_company_c_patch,
  // Single
  api_single_company_c_get,
  api_single_company_c_post,
  api_single_company_c_patch,
} = require("../../controllers/API/CompanyPageAPI/api_category_controller");

// Company API *** //
// Company Post
router
  .route("/companies")
  .get(api_company_get)
  .post(api_company_post)
  .patch(api_company_patch);
// Single
router
  .route("/companies/:id")
  .get(api_single_company_get)
  .post(api_single_company_post)
  .patch(api_single_company_patch);

// Company Category
router
  .route("/companies-categories")
  .get(api_company_c_get)
  .post(api_company_c_post)
  .patch(api_company_c_patch);

router
  .route("/companies-categories/:id")
  .get(api_single_company_c_get)
  .post(api_single_company_c_post)
  .patch(api_single_company_c_patch);

// Company Post API End *** //
module.exports = router;
