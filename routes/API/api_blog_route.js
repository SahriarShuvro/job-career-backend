const express = require("express");
const router = express.Router();
const {
  // Blogs
  api_blog_get,
  api_blog_post,
  api_blog_patch,
  // Single
  api_single_blog_get,
  api_single_blog_post,
  api_single_blog_patch,
} = require("../../controllers/API/BlogPageAPI/api_blog_controller");

const {
  // Categories
  api_blog_c_get,
  api_blog_c_post,
  api_blog_c_patch,
  // Single
  api_single_blog_c_get,
  api_single_blog_c_post,
  api_single_blog_c_patch,
} = require("../../controllers/API/BlogPageAPI/api_categories_controller");
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
