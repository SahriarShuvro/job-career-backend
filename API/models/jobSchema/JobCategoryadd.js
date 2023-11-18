const { Schema, model } = require("mongoose");

const JobCategoryAddSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      max: 30,
    },
    color_code: {
      type: String,
      require: true,
    },
    active_status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobCategoryAdd = model("JobCategoryAdd", JobCategoryAddSchema);
module.exports = JobCategoryAdd;
