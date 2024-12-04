const AppError = require("../utils/AppError");
const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { address } = req.query;
    console.log(address);
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json({
      status: "success",
      message: "Coordinates fetched successfully",
      data: {
        coordinates,
      },
    });
  } catch (error) {
    next(new AppError(error.message || "Error fetching coordinates", 500));
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json({
      status: "success",
      message: "Distance and time fetched successfully",
      data: {
        distanceTime,
      },
    });
  } catch (error) {
    throw new AppError(
      error.message || "Error fetching distance and time",
      500
    );
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json({
      status: "success",
      message: "Suggestions fetched successfully",
      data: {
        suggestions,
      },
    });
  } catch (error) {
    throw new AppError(error.message || "Error fetching suggestions", 500);
  }
};