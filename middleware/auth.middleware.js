const passport = require("passport");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("Entering authentication middleware");

    if (err) {
      console.error("Passport authentication error:", err);
      return next(err);
    }

    if (!user) {
      console.error("Authentication failed. No user found.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    console.log("Authentication successful. User:", user);
    next();
  })(req, res, next);
};

module.exports = authenticate;
