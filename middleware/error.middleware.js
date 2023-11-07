exports.error_middleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  // error.status = error.status || "error";
  res.status({ status: error.statusCode, message: error.message });
};
