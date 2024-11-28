const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

module.exports.authUser = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new AppError("No token provided. Please login first", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }
    return next(error);
  }
};
