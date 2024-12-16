const userModel = require("../models/user.model");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    if (!firstName || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    const user = await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    // Remove sensitive data
    user.password = undefined;

    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      throw new AppError(messages[0], 400);
    }
    throw error;
  }
};

module.exports.requestPasswordReset = async (email) => {
  console.log("Email from service", email);

  try {
    // Validate email input
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    console.log("User from service", user);

    // Check if user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Generate password reset token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("JWT secret is not configured", 500);
    }

    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });

    // Construct reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password?id=${user._id}&token=${token}`;
    console.log("Reset Link", resetLink);

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Validate email configuration
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new AppError("Email configuration is incomplete", 500);
    }

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetLink}\n\n
      This link will expire in 1 hour.\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return the token for logging/verification purposes
    return token;
  } catch (error) {
    // Log the error for debugging
    console.error("Password Reset Error:", error);

    // Handle specific error types
    if (error instanceof AppError) {
      throw error;
    }

    // Generic error handling
    if (error.name === "ValidationError") {
      throw new AppError("Invalid email format", 400);
    }

    // Catch-all for other errors
    throw new AppError("Failed to process password reset", 500);
  }
};
