const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

const User = require("../model/AuthSchema"); // Assuming you have a user model

const cookieExtractor = function (req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwtPayload,
  done
) {
  try {
    // Using .exec() to execute the query and return a Promise
    const user = await User.findOne({ _id: jwtPayload.sub });
    console.log(user);

    console.log("User.findOne result:", jwtPayload);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error, false);
  }
});

passport.use(jwtStrategy);
module.exports = passport;
