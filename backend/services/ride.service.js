const rideModel = require("../models/ride.model");
const AppError = require("../utils/AppError");
const mapService = require("../services/map.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new AppError("Pickup and destination are required", 400);
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

  const distance = await mapService.getDistanceTime(pickup, destination);

  // Calculate fares for all vehicle types
  const fares = {};
  for (const [vehicleType, rate] of Object.entries(fareRates)) {
    let fare = rate.baseFare + distance * rate.perKm;
    // Ensure fare is not less than minimum fare
    fare = Math.max(fare, rate.minFare);
    fares[vehicleType] = Math.round(fare);
  }

  return fares;
}

function getOTP(num) {
  // Using crypto.randomInt to generate cryptographically secure random numbers
  return Array.from({ length: num }, () => crypto.randomInt(0, 10)).join("");
}

const createRide = async ({ user, pickup, destination }) => {
  if (!user || !pickup || !destination) {
    throw new AppError("User, pickup and destination are required", 400);
  }

  const fares = await getFare(pickup, destination);
  const fare = fares[user.vehicleType];
  const otp = getOTP(4);

  const ride = await rideModel.create({
    user: user.id,
    pickup,
    destination,
    fare,
    status: "pending",
    otp,
  });

  return ride;
};

const getAllRides = async () => {
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

const getUserRides = async (userId) => {
  try {
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    const rides = await rideModel
      .find({ user: userId, status: { $in: ["completed", "cancelled"] } })
      .sort({ createdAt: -1 })
      .populate("captain", "fullName")
      .select(
        "pickup destination fare status captain createdAt duration distance"
      );

    return rides;
  } catch (error) {
    throw new AppError(error.message || "Error fetching user rides", 500);
  }
};

const getCaptainRides = async (captainId) => {
  try {
    // Validate captainId
    if (!captainId) {
      throw new Error("Captain ID is required");
    }

    // Find all rides where the captain matches the given captainId
    const rides = await rideModel
      .find({ captain: captainId, status: { $in: ["completed", "cancelled"] } })
      .populate("user", "fullName.firstName fullName.lastName email")
      .sort({ createdAt: -1 }); // Sort by most recent first

    // Calculate total earnings
    const totalEarnings = rides.reduce(
      (total, ride) => total + (ride.fare || 0),
      0
    );

    return {
      rides,
      totalRides: rides.length,
      totalEarnings,
    };
  } catch (error) {
    console.error("Error in getCaptainRides:", error);
    throw new Error(`Failed to retrieve captain rides: ${error.message}`);
  }
};

module.exports = {
  createRide,
  getAllRides,
  getUserRides,
  getCaptainRides,
  getFare,
};
