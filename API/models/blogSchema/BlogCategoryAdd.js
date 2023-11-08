const { Schema, model } = require("mongoose");

const BlogCategoryAddSchema = new Schema(
  {
    category_title: {
      type: String,
      require: true,
      max: 30,
    },
    color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogCategoryAdd = model("BlogCategoryAdd", BlogCategoryAddSchema);
module.exports = BlogCategoryAdd;
