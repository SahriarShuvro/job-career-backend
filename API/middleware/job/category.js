const { check, validationResult } = require("express-validator");

const validateCategory = [
  // Validation rules for title
  check("title")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Category title is required!"),

  // Validation rules for color_code
  check("color_code")
    .not()
    .isEmpty()
    .escape()
    .withMessage("Category color code is required!")
    .isHexColor()
    .withMessage("Category color code must be a valid hex color code!"),

  // Validation rules for active_status
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

module.exports = validateCategory;
