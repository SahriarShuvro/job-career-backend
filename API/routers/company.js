const express = require("express");
const router = express.Router();

// Controllers Import
const {
  api_company_get,
  api_create_company,
  // single
  api_single_company_get,
  api_update_company,
  api_company_active_inactive,
  api_delete_company,
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

// file Uploade middleware
const { upload } = require("../middleware/global/fileUploade");

// Company API *** //
// Company Post
router
  .route("/companies")
  .get(api_company_get)
  .post(validateCompany, upload.single("avatar"), api_create_company);
// Single
router
  .route("/companies/:id")
  .get(api_single_company_get)
  .patch(upload.single("avatar"), api_update_company)
  .put(api_company_active_inactive)
  .delete(api_delete_company);

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
