const User = require("../../model/AuthSchema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
// *****  Auth page start ***** //
exports.sign_up = (req, res) => {
  try {
    res.render("./pages/admin/signUp");
  } catch (err) {
    console.log(err);
  }
};
exports.sign_in = (req, res) => {
  try {
    res.render("./pages/admin/signIn");
  } catch (err) {
    console.log(err);
  }
};
// Create User
exports.create_user = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const newUser = new User({
      username,
      email,
      password, // WARNING: Storing plain text password, not recommended for production
      phone,
    });

    await newUser.save();
    console.log(newUser);
    res.redirect("/auth/signin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sign In User
exports.sign_in_user = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Fetch user from the database based on the provided email
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // Set the token as an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        path: "/admin",
      });

      console.log("Log in success");
      return res.redirect("/admin");
    }

    // If the email or password is invalid
    res.status(401).json({ message: "Authentication failed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// *****  Auth page end ***** //
