const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
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

const getCaptainRides = async (req, res) => {
  try {
    // Get captain ID from authenticated request
    const captainId = req.captain._id;

    // Fetch captain rides
    const { rides, totalRides, totalEarnings } =
      await rideService.getCaptainRides(captainId);

    // Respond with success
    return res.status(200).json({
      success: true,
      data: {
        rides,
        totalRides,
        totalEarnings,
      },
    });
  } catch (error) {
    console.error("Error in getCaptainRides controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve captain rides",
      error: {
        statusCode: 500,
      },
    });
  }
};

const getFare = async (req, res, next) => {
  try {
    const { pickup, destination } = req.query;

    const fares = await rideService.getFare(pickup, destination);

    res.status(200).json({
      status: "success",
      message: "Fares calculated successfully",
      data: { fares },
    });
  } catch (error) {
    next(new AppError(error.message || "Error calculating fares", 500));
  }
};

const getETA = async (req, res, next) => {
  try {
    const { pickup, destination } = req.query;

    // Validate input
    if (!pickup || !destination) {
      return res.status(400).json({
        status: "error",
        message: "Pickup and destination addresses are required",
      });
    }

    try {
      const pickupCoords = await mapService.getAddressCoordinates(pickup);
      const destinationCoords =
        await mapService.getAddressCoordinates(destination);

      if (!pickupCoords || !destinationCoords) {
        next(
          new AppError(
            "Unable to get coordinates for the provided addresses",
            400,
          ),
        );
      }

      const { travelTime, distance, formattedTime } =
        await rideService.calculateETA(
          { latitude: pickupCoords.lat, longitude: pickupCoords.lng },
          { latitude: destinationCoords.lat, longitude: destinationCoords.lng },
        );

      res.status(200).json({
        status: "success",
        message: "ETA calculated successfully",
        data: {
          ride: {
            estimatedTravelTime: travelTime,
            estimatedTravelTimeLabel: formattedTime,
            totalDistance: distance,
            distanceLabel: `Approx. ${distance} away`,
          },
          details: {
            pickupAddress: pickup,
            destinationAddress: destination,
          },
        },
      });
    } catch (error) {
      console.error("Geocoding or ETA calculation error:", error);
      next(new AppError(error.message || "Error calculating route", 500));
    }
  } catch (error) {
    console.error("ETA Calculation Error:", error);
    next(new AppError(error.message || "Error calculating ETA", 500));
  }
};

module.exports = {
  createRide,
  getAllRides,
  getUserRides,
  getCaptainRides,
  getFare,
  getETA,
};
