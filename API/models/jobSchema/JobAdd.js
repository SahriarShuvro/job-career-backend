const { Schema, model } = require("mongoose");

const JobAddSchema = new Schema(
  {
    job_title: {
      type: String,
      required: true,
      max: 99,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
      max: 99,
    },
    job_location: {
      type: String,
      required: true,
      max: 199,
    },
    qualification: {
      type: String,
      required: true,
      max: 30,
    },
    employment_status: {
      type: String,
      required: true,
      max: 99,
    },
    offerd_salary: {
      type: Number,
      required: true,
    },
    salary_negotiable: {
      type: String,
      required: true,
      max: 10,
    },
    category: {
      type: String,
      required: true,
      max: 30,
    },
    vacancy: {
      type: Number,
      required: true,
      max: 30,
    },
    industry: {
      type: String,
      required: true,
      max: 99,
    },
    experience: {
      type: String,
      required: true,
      max: 999,
    },
    gender: {
      type: String,
      required: true,
      max: 999,
    },
    job_details: {
      type: String,
      required: true,
      max: 1999,
    },
    skills_required: {
      type: String,
      required: true,
      max: 999,
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

const JobPost = model("JobPost", JobAddSchema);
module.exports = JobPost;
