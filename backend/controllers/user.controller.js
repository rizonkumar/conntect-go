const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const AppError = require("../utils/AppError");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Check if required fields exist in request body
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      throw new AppError("Missing required fields", 400);
    }

    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          fullName: user.fullName,
          email: user.email,
          _id: user._id,
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new AppError("Email already exists", 409));
    }
    next(error);
  }
};
