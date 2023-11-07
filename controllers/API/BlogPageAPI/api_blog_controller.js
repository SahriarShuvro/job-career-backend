const BlogAdd = require("../../../models/blogSchema/BlogAdd");
const BlogCategoryAdd = require("../../../models/blogSchema/BlogCategoryAdd");
// *****  Blog page start ***** //
// Blog Add ** //
// Get
exports.api_blog_get = async (req, res, next) => {
  const allBlog = await BlogAdd.find({}).exec();
  try {
    res.send(allBlog);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Post
exports.api_blog_post = async (req, res, next) => {
  let {
    blog_title,
    category,
    details_one,
    inner_title,
    details_two,
    quotation,
    details_three,
    tags,
    images,
  } = req.body;

  const blog_add = new BlogAdd({
    blog_title,
    category,
    details_one,
    inner_title,
    details_two,
    quotation,
    details_three,
    tags,
    images,
  });

  blog_add.save();
  const allBlog = await BlogAdd.find({}).exec();
  try {
    res.send(allBlog);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Patch
exports.api_blog_patch = async (req, res, next) => {
  res.send("Blog Category Patch API");
  next();
};

// Single
exports.api_single_blog_get = async (req, res, next) => {
  res.send("blog single");
};
exports.api_single_blog_post = async (req, res, next) => {
  res.send("blog single");
};
exports.api_single_blog_patch = async (req, res, next) => {
  res.send("blog single");
};

// *****  Blog page end ***** //
