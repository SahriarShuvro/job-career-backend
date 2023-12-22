const express = require("express");
const router = express.Router();

// Controller Import
const { create_user, sign_in_user } = require("../controllers/auth/");

router.route("/signup").post(create_user);
router.route("/signin").post(sign_in_user);

module.exports = router;
