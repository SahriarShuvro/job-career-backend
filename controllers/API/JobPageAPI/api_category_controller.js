const JobCategoryAdd = require("../../../models/jobSchema/JobCategoryadd");
// Job Category  ** //
// Get
exports.api_category_get = async (req, res, next) => {
  const allJobCategory = await JobCategoryAdd.find({}).exec();
  try {
    res.send(allJobCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Post
exports.api_category_post = async (req, res, next) => {
  let { category_title, color_code } = req.body;
  const category_add = new JobCategoryAdd({ category_title, color_code });

  category_add.save();

  const allJobCategory = await JobCategoryAdd.find({}).exec();
  try {
    res.send(allJobCategory);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Patch
exports.api_category_patch = async (req, res, next) => {
  res.send("Category Patch");
  next();
};

// Single Category
exports.api_single_category_get = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_category_post = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_category_patch = async (req, res, next) => {
  res.send("hi");
};
