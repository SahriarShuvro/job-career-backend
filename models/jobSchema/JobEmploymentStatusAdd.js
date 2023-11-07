const { Schema, model } = require("mongoose");

const JobEmploymentStatusAddSchema = new Schema(
  {
    employment_status_title: {
      type: String,
      require: true,
      max: 30,
    },
    employment_status_color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobEmploymentStatusAdd = model(
  "JobEmploymentStatusAdd",
  JobEmploymentStatusAddSchema
);
module.exports = JobEmploymentStatusAdd;
