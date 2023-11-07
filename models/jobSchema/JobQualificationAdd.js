const { Schema, model } = require("mongoose");

const JobQualificationAddSchema = new Schema(
  {
    qualification_title: {
      type: String,
      require: true,
      max: 30,
    },
    qualification_color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobQualificationAdd = model(
  "JobQualificationAdd",
  JobQualificationAddSchema
);
module.exports = JobQualificationAdd;
