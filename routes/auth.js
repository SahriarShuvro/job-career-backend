const express = require("express");
const router = express.Router();

const {
  sign_up,
  sign_in,
  create_user,
  sign_in_user,
} = require("../controllers/admin/auth");
// Auth Route
router.route("/signup").get(sign_up).post(create_user);

router.route("/signin").get(sign_in).post(sign_in_user);

module.exports = router;
