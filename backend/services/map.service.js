const axios = require("axios");
require("dotenv").config();

module.exports.getAddressCoordinates = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    console.log("Response: ------>>>>>", response.data);

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      console.log("Location:", location);
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("No results found for the given address");
    }
  } catch (error) {
    throw new Error(`Error getting coordinates: ${error.message}`);
  }
};
