const { check, validationResult } = require("express-validator");

exports.validateCompany = [
  check("avatar").isEmpty().escape().withMessage("Company Logo is required!"),

  check("title").isEmpty().escape().withMessage("Company Name is required!"),

  check("phone")
    .not()
    .matches(/^\d{11,13}$/)
    .withMessage("Invalid phone number"),

  check("email")
    .not()
    .matches(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Invalid email address"),

  check("address")
    .isEmpty()
    .escape()
    .withMessage("Company Address is required!"),

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
exports.validateEditCompany = [
  check("avatar").isEmpty().escape().withMessage("Company Logo is required!"),

  check("title").isEmpty().escape().withMessage("Company Name is required!"),

  check("phone")
    .not()
    .matches(/^\d{11,13}$/)
    .withMessage("Invalid phone number"),

  check("email")
    .not()
    .matches(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Invalid email address"),

  check("address")
    .isEmpty()
    .escape()
    .withMessage("Company Address is required!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
