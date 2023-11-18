const { Schema, model } = require("mongoose");

const JobIndustryAddSchema = new Schema(
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

const JobIndustryAdd = model("JobIndustryAdd", JobIndustryAddSchema);
module.exports = JobIndustryAdd;
