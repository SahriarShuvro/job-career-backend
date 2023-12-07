const { check, validationResult } = require("express-validator");

exports.validateCompany = [
  check("avatar")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Logo is required!"),

  check("name")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Name is required!"),

  check("phone")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Phone is required!")
    .isNumeric()
    .withMessage("Company Phone should be Numaric"),

  check("email")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Email is required!")
    .isEmail()
    .withMessage("Company Email Should be mail type. ex: example@email.com"),

  check("address")
    .not()
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
  check("avatar")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Logo is required!"),

  check("name")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Name is required!"),

  check("phone")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Phone is required!")
    .isNumeric()
    .withMessage("Company Phone should be Numaric"),

  check("email")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Company Email is required!")
    .isEmail()
    .withMessage("Company Email Should be mail type. ex: example@email.com"),

  check("address")
    .not()
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
