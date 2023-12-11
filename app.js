const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");

// Route
const admin_route = require("./routes/admin");

// Api Routes
const apiRoutes = require("./API/routers/route");

// Error middlewar
const { error_middleware } = require("./middleware/error.middleware");

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

app.use(cors());
app.use(middleware);
// Admin Route
app.use("/admin", admin_route);
// API routes
app.use("/api", apiRoutes);

// Global Error Route
app.all("*", error_controller, error_middleware);

// Database Connection
const PORT = 8080;
// const URL = "mongodb://127.0.0.1:27017/admin";
const URL =
  "mongodb+srv://allJobBDuser:ub8SBYPREpEMg20a@alljobdbname.ff1flso.mongodb.net/jobdataname?retryWrites=true&w=majority";

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB local!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
