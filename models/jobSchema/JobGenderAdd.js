const { Schema, model } = require("mongoose");

const JobGenderAddSchema = new Schema(
  {
    gender_title: {
      type: String,
      require: true,
      max: 30,
    },
    gender_color_code: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobGenderAdd = model("JobGenderAdd", JobGenderAddSchema);
module.exports = JobGenderAdd;
