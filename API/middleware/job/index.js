const { check, validationResult } = require("express-validator");

exports.validateJob = [
  check("job_title")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job title is required!"),

  check("start_date")
    .not()
    .isEmpty()
    .escape()
    .isDate()
    .withMessage("Job start date is required!"),

  check("end_date")
    .not()
    .isEmpty()
    .escape()
    .isDate()
    .withMessage("Job end date is required!"),

  check("company")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company name is required!"),

  check("job_location")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job location is required!"),

  check("qualification")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job qualification is required!"),

  check("employment_status")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job employment status is required!"),

  check("offerd_salary")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job Offerd is required!"),

  check("salary_negotiable")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job salary negotiable status is required!"),

  check("category")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job category is required!"),

  check("vacancy")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job vacancy is required!"),

  check("industry")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job industry is required!"),

  check("experience")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job experience is required!"),

  check("gender")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job gender is required!"),

  check("job_details")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job job details is required!"),

  check("skills_required")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job job skills is required!"),

  check("active_status")
    .optional()
    .isBoolean()
    .withMessage("Active status must be a boolean value!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateEditJob = [
  check("job_title")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job title is required!"),

  check("start_date")
    .not()
    .isEmpty()
    .escape()
    .isDate()
    .withMessage("Job start date is required!"),

  check("end_date")
    .not()
    .isEmpty()
    .escape()
    .isDate()
    .withMessage("Job end date is required!"),

  check("company")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company name is required!"),

  check("job_location")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job location is required!"),

  check("qualification")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job qualification is required!"),

  check("employment_status")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job employment status is required!"),

  check("offerd_salary").notEmpty().withMessage("Job Offerd is required!"),

  check("salary_negotiable")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job salary negotiable status is required!"),

  check("category")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job category is required!"),

  check("vacancy")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job vacancy is required!"),

  check("industry")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job industry is required!"),

  check("experience")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job experience is required!"),

  check("gender")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job gender is required!"),

  check("job_details")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job job details is required!"),

  check("skills_required")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Job job skills is required!"),

  check("active_status")
    .optional()
    .isBoolean()
    .withMessage("Active status must be a boolean value!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
