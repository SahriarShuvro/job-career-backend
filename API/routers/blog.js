const express = require("express");
const router = express.Router();
// Controller Import
const {
  // Blogs
  api_blog_get,
  api_blog_post,
  api_blog_patch,
  // Single
  api_single_blog_get,
  api_single_blog_post,
  api_single_blog_patch,
} = require("../controllers/blog/");

const {
  // Categories
  api_blog_c_get,
  api_blog_c_post,
  api_blog_c_patch,
  // Single
  api_single_blog_c_get,
  api_single_blog_c_post,
  api_single_blog_c_patch,
} = require("../controllers/blog/categories");

// Middleware Import
// Middleware **
// const validateJobCategory = require("../middleware/job/category");
// Blog API *** //
// Blog Post
router
  .route("/blogs")
  .get(api_blog_get)
  .post(api_blog_post)
  .patch(api_blog_patch);
// Single
router
  .route("/blogs/:id")
  .get(api_single_blog_get)
  .post(api_single_blog_post)
  .patch(api_single_blog_patch);

// Blog Category
router
  .route("/blogs-categories")
  .get(api_blog_c_get)
  .post(api_blog_c_post)
  .patch(api_blog_c_patch);
// Single
router
  .route("/blogs-categories/:id")
  .get(api_single_blog_c_get)
  .post(api_single_blog_c_post)
  .patch(api_single_blog_c_patch);

// Blog Post API End *** //
module.exports = router;
