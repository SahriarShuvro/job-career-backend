const router = require("express").Router();

const { sign_up, sign_in } = require("../controllers/admin/auth");
// Auth Route
router.get("/signup", sign_up);

router.get("/signin", sign_in);

module.exports = router;
