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

module.exports.loginUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: error.array(),
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
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
    console.log(error);
  }
};
