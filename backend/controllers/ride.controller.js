const rideService = require("../services/ride.service");
const AppError = require("../utils/AppError");

const createRide = async (req, res, next) => {
  try {
    const { pickup, destination } = req.body;
    const user = {
      id: req.user._id,
      vehicleType: req.body.vehicleType, // 'auto', 'car', or 'motorcycle'
    };

    const ride = await rideService.createRide({ user, pickup, destination });

    res.status(201).json({
      status: "success",
      message: "Ride created successfully",
      data: { ride },
    });
  } catch (error) {
    next(new AppError(error.message || "Error creating ride", 500));
  }
};

const getAllRides = async (req, res, next) => {
  try {
    const rides = await rideService.getAllRides();
    res.status(200).json({
      status: "success",
      message: "Rides fetched successfully",
      data: { rides },
    });
  } catch (error) {
    next(new AppError(error.message || "Error fetching rides", 500));
  }
};

const getUserRides = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const rides = await rideService.getUserRides(userId);

    res.status(200).json({
      success: true,
      message: "User rides fetched successfully",
      data: { rides },
    });
  } catch (error) {
    next(new AppError(error.message || "Error fetching user rides", 500));
  }
};

module.exports = {
  createRide,
  getAllRides,
  getUserRides,
};
