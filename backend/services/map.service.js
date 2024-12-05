const axios = require("axios");
require("dotenv").config();
const AppError = require("../utils/AppError");

module.exports.getAddressCoordinates = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    console.log("Google Maps API Response:", response.data);
    if (!response.data.results?.length) {
      throw new Error("No results found for the given address", 400);
    }

    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    throw new AppError(error.response?.data?.message || error.message, 500);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new AppError("Origin and destination are required", 400);
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (
        response.data.rows[0].elements[0].status === "NOT_FOUND" ||
        response.data.rows[0].elements[0].status === "ZERO_RESULTS"
      ) {
        throw new AppError("No route found between the two locations", 400);
      }
      // Return distance in kilometers
      return response.data.rows[0].elements[0].distance.value / 1000;
    } else {
      throw new AppError(response.data.error_message || "Distance Matrix API error", 500);
    }
  } catch (error) {
    throw new AppError(error.message || "Error calculating distance", 400);
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new AppError("Input is required", 400);
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    if (response.data.status === "ZERO_RESULTS") {
      throw new AppError("No results found for the given input", 400);
    }
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new AppError(response.data.error.message, 500);
    }
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
