const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const User = require("../model/AuthSchema"); // Assuming you have a user model

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById({ id: jwtPayload.email }, (err, user) => {
    console.log("User.findById result:", err, user);
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(jwtStrategy);

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
