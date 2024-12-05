const rideModel = require("../models/ride.model");
const AppError = require("../utils/AppError");
const mapService = require("../services/map.service");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination) {
    throw new AppError("Pickup and destination are required", 400);
  }

  if (!vehicleType) {
    throw new AppError("Vehicle type is required", 400);
  }

  // Base fares and per kilometer rates for different vehicle types
  const fareRates = {
    auto: {
      baseFare: 30,
      perKm: 15,
      minFare: 30,
    },
    car: {
      baseFare: 50,
      perKm: 20,
      minFare: 50,
    },
    motorcycle: {
      baseFare: 20,
      perKm: 12,
      minFare: 20,
    },
  };

  if (!fareRates[vehicleType]) {
    throw new AppError("Invalid vehicle type", 400);
  }

  const distance = await mapService.getDistanceTime(pickup, destination);
  const rate = fareRates[vehicleType];

  // Calculate fare
  let fare = rate.baseFare + distance * rate.perKm;

  // Ensure fare is not less than minimum fare
  fare = Math.max(fare, rate.minFare);

  // Round to nearest integer
  return Math.round(fare);
}

module.exports.createRide = async ({ user, pickup, destination }) => {
  if (!user || !pickup || !destination) {
    throw new AppError("User, pickup and destination are required", 400);
  }
  const fare = await getFare(pickup, destination, user.vehicleType);

  const ride = await rideModel.create({
    user: user.id,
    pickup,
    destination,
    fare,
    status: "pending",
  });

  return ride;
};

module.exports.getAllRides = async () => {
  try {
    const rides = await rideModel
      .find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("user", "name email"); // Populate user details if needed

    return rides;
  } catch (error) {
    throw new AppError("Error fetching rides", 500);
  }
};
