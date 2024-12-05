const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide, getAllRides } = require("../controllers/ride.controller");

router.post(
  "/create-ride",
  [
    body("userId")
      .isString()
      .isLength({ min: 24, max: 24 })
      .withMessage("Invalid userId"),
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Pickup is required"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination is required"),
    body("vehicleType")
      .isIn(["auto", "car", "motorcycle"])
      .withMessage("Invalid vehicle type"),
  ],
  createRide
);

router.get("/rides", getAllRides);

module.exports = router;
