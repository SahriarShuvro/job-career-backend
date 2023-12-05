const express = require("express");
const router = express.Router();

// Controllers Import
const {
  api_company_get,
  api_company_post,
  // single
  api_single_company_get,
  api_company_edit,
  api_company_active_inactive,
  api_company_delete,
} = require("../controllers/company/");

const {
  // Category
  api_company_c_get,
  api_company_c_post,
  api_company_c_patch,
  // Single
  api_single_company_c_get,
  api_single_company_c_post,
  api_single_company_c_patch,
} = require("../controllers/company/categories");

// Middleware Import
const {
  validateCompany,
  validateEditCompany,
} = require("../middleware/company/");
// const validateCompanyCategory = require("../middleware/company/category");

// Company API *** //
// Company Post
router
  .route("/companies")
  .get(api_company_get)
  .post(validateCompany, api_company_post);
// Single
router
  .route("/companies/:id")
  .get(api_company_edit)
  .patch(validateEditCompany, api_company_edit)
  .put(api_company_active_inactive)
  .delete(api_company_delete);

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
