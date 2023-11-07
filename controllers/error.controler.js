exports.error_controller = async (req, res, next) => {
  const err = new Error(`The page you were looking for doesn't exist anymore.`);

  res.render("./errorPage", {
    // errStatus: (err.status = "fail"),
    errCode: (err.statusCode = 404),
    message: err,
  });
  next(err);
};
