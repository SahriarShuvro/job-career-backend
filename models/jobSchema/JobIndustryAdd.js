const { Schema, model } = require("mongoose");

const JobIndustryAddSchema = new Schema(
  {
    industry_title: {
      type: String,
      require: true,
      max: 30,
    },
    industry_color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobIndustryAdd = model("JobIndustryAdd", JobIndustryAddSchema);
module.exports = JobIndustryAdd;
