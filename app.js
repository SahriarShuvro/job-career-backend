const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Auth Route
const auth_route = require("./routes/auth");
// Admin Route
const admin_route = require("./routes/admin");

// Api Routes
const apiRoutes = require("./API/routers/route");

// Middlewars
const { error_middleware } = require("./middleware/error.middleware");
const authenticate = require("./middleware/auth.middleware");

// Error controller
const { error_controller } = require("./controllers/error.controler");

// Playground
const playgournd = require("./playgournd");
playgournd(app, mongoose);

// Views Engine
app.set("views", "views");
app.set("view engine", "ejs");

// Middleware
const middleware = [
  express.static("public"),
  express.urlencoded({ extended: false }),
  express.json(),
];
app.use(cookieParser());
app.use(cors());

// Initialize Passport middleware
app.use(passport.initialize());

app.use(middleware);

// Auth Route
app.use("/auth", auth_route);
// Admin Route
app.use("/admin", authenticate, admin_route);

// API routes
app.use("/api", apiRoutes);

// Global Error Route
app.all("*", error_controller, error_middleware);

// Database Connection
const PORT = process.env.PROT || 8080;
// const URL = "mongodb://127.0.0.1:27017/admin";
const URL = process.env.MONGODB_LOCAL;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB local!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
