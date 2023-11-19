const { check, validationResult } = require("express-validator");

const validateJob = [
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
    .isNumeric()
    .withMessage("Job Offerd is required!")
    .custom((value) => {
      const numericValue = parseFloat(value);
      if (!Number.isInteger(numericValue) || numericValue < 0) {
        throw new Error("Offerd Salary must be a positive integer!");
      }
      return true;
    }),

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
    .isNumeric()
    .withMessage("Job vacancy is required!")
    .custom((value) => {
      const numericValue = parseFloat(value);
      if (!Number.isInteger(numericValue) || numericValue < 0) {
        throw new Error("Vacancy must be a positive integer!");
      }
      return true;
    }),

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

module.exports = validateJob;
