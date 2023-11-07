const { Schema, model } = require("mongoose");

const JobCategoryAddSchema = new Schema(
  {
    category_title: {
      type: String,
      require: true,
      max: 30,
    },
    category_color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobCategoryAdd = model("JobCategoryAdd", JobCategoryAddSchema);
module.exports = JobCategoryAdd;
