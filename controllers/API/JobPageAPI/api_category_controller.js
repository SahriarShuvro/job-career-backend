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
  let { category_title, category_color_code } = req.body;
  const category_add = new JobCategoryAdd({
    category_title,
    category_color_code,
  });

  category_add.save();

  const allJobCategory = await JobCategoryAdd.find({}).exec();
  try {
    res.send(allJobCategory);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Single Category
exports.api_single_category_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleCategory = await JobCategoryAdd.findById(id);

    if (!singleCategory) {
      res.status(404).json({ message: "Category Not Found" });
    }

    res.json(singleCategory);
  } catch (error) {
    console.log(error);
  }
};
exports.api_single_category_post = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_category_patch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSingleCategory = await JobCategoryAdd.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.json({ updateSingleCategory });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: `Something went wrong` });
  }
};
exports.api_single_category_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobCategoryAdd.findByIdAndRemove(
      { _id: id },
      req.body
    );

    if (!deletedJobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.json(deletedJobPost);
  } catch (error) {
    next(error);
  }
};
