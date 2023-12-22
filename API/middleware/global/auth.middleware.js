const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("../../models/AuthSchema");

const secretKey = "#job%career%2%23#";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      // Redirect to the login page if authentication fails
      console.log("Unauthorized");
      console.log(user);
      return res.redirect("/auth/signin");
    }

    // Redirect to the dashboard upon successful authentication
    console.log("Authorized");
    next();
  })(req, res, next);
};

module.exports = { authenticateJWT };
