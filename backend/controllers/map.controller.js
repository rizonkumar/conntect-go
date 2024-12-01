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
