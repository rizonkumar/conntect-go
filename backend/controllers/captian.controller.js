const captainModel = require("../models/captain.model");
const AppError = require("../utils/AppError");
const captianService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyRegistered = await captainModel.findOne({
      email,
    });
    if (isCaptainAlreadyRegistered) {
      throw new AppError("Captain already registered", 409);
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captianService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    const sanitizedCaptain = {
      _id: captain._id,
      fullName: captain.fullName,
      email: captain.email,
      vehicle: captain.vehicle,
      status: captain.status,
    };

    res.status(201).json({
      status: "success",
      message: "Captain registered successfully",
      data: {
        captain: sanitizedCaptain,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
