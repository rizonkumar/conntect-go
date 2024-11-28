const AppError = require("../utils/AppError");

// Handle invalid JSON
exports.handleJSONError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
      error: {
        statusCode: 400,
      },
    });
  }
  next(err);
};

// Handle 404 routes
exports.handle404 = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};

// Main error handler
exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new AppError(`${field} already exists`, 409);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    err = new AppError(errors[0], 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token. Please log in again", 401);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    err = new AppError("Your token has expired. Please log in again", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: {
      statusCode: err.statusCode,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};
