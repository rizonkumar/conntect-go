const axios = require("axios");
require("dotenv").config();

module.exports.getAddressCoordinates = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    console.log("Google Maps API Response:", response.data);
    if (!response.data.results?.length) {
      throw new Error("No results found");
    }

    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
