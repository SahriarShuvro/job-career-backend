// Schema ***
const JobCategoryAdd = require("../../models/jobSchema/JobCategoryadd");
const he = require("he");
// Job Category  ** //
// Get

exports.api_category_get = async (req, res, next) => {
  try {
    const allJobCategory = await JobCategoryAdd.find({}).exec();

    const decodedCategories = allJobCategory.map((category) => ({
      _id: category._id,
      title: he.decode(category.title),
      color_code: he.decode(category.color_code),
      active_status: category.active_status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    res.send(decodedCategories);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Post
exports.api_category_post = async (req, res, next) => {
  try {
    let { title, color_code } = req.body;

    const existingCategoryTitle = await JobCategoryAdd.findOne({
      title,
    }).exec();

    if (existingCategoryTitle) {
      return res.status(400).json({
        errors: [
          {
            msg: "Category title already exists!",
          },
        ],
      });
    }

    const category_add = new JobCategoryAdd({
      title,
      color_code,
    });

    await category_add.save();

    const allJobCategory = await JobCategoryAdd.find({}).exec();

    res.send(allJobCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Single Category
exports.api_single_category_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleCategory = await JobCategoryAdd.findById(id);

    if (!singleCategory) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }

    const decodedCategory = {
      _id: singleCategory._id,
      title: he.decode(singleCategory.title),
      color_code: he.decode(singleCategory.color_code),
      active_status: singleCategory.active_status,
      createdAt: singleCategory.createdAt,
      updatedAt: singleCategory.updatedAt,
    };

    res.json(decodedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_category_post = async (req, res, next) => {
  res.send("hi");
};

exports.api_single_category_edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, color_code } = req.body;

    const existingCategoryTitle = await JobCategoryAdd.findOne({
      title,
    }).exec();

    if (existingCategoryTitle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Category title already exists!" }] });
    }

    // Update the category
    const updatedCategory = await JobCategoryAdd.findOneAndUpdate(
      { _id: id },
      { title, color_code },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true, updatedCategory });
  } catch (error) {
    console.error("Error in api_single_category_edit:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_category_activate_inactivate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the category's active_status
    const updatedCategory = await JobCategoryAdd.findOneAndUpdate(
      { _id: id },
      { active_status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true, updatedCategory });
  } catch (error) {
    console.error("Error in api_single_category_activate_inactivate:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_category_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobCategory = await JobCategoryAdd.findByIdAndRemove(
      { _id: id },
      req.body
    );

    if (!deletedJobCategory) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.json(deletedJobCategory);
  } catch (error) {
    next(error);
  }
};
