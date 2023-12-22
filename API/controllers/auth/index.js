const User = require("../../models/AuthSchema");
const jwt = require("jsonwebtoken");
const secretKey = "#job%career%2%23#";
// const cookie = require("cookie");
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
    console.log(user);

    if (user && user.password === password) {
      const token = jwt.sign({ sub: user.id }, secretKey, {
        expiresIn: "1h",
      });

      // Set the token as an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        path: "/admin", // cookie will be available on the entire domain
      });

      // Redirect to "/admin/dashboard" after successful login
      return res.redirect("/admin/dashboard");
    }

    // If the email or password is invalid
    res.status(401).json({ message: "Authentication failed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
