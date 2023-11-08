const BlogCategoryAdd = require("../../models/blogSchema/BlogCategoryAdd");
// Blog Category ** //

exports.api_blog_c_get = async (req, res, next) => {
  const allBlogCategory = await BlogCategoryAdd.find({}).exec();
  try {
    res.send(allBlogCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.api_blog_c_post = async (req, res, next) => {
  let { category_title, color_code } = req.body;
  const category_add = new BlogCategoryAdd({ category_title, color_code });

  category_add.save();

  const allBlogCategory = await BlogCategoryAdd.find({}).exec();
  try {
    res.send(allBlogCategory);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.api_blog_c_patch = async (req, res, next) => {
  res.send("Blog Category Patch API");
  next();
};

// Single
exports.api_single_blog_c_get = async (req, res, next) => {
  res.send("blog category single");
};
exports.api_single_blog_c_post = async (req, res, next) => {
  res.send("blog category single");
};
exports.api_single_blog_c_patch = async (req, res, next) => {
  res.send("blog category single");
};
