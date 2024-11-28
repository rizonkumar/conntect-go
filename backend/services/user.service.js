const userModel = require("../models/user.model");
const AppError = require("../utils/AppError");

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
