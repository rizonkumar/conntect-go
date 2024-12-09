import React, { useState, useCallback, useEffect } from "react";
import { Clock, User } from "lucide-react";
import { rides } from "../../constants/data";
import RideConfirmation from "./RideConfirmation";
import RideConfirm from "./RideConfirm";
import { getFares } from "../api/userApi";

const RideOptions = ({ pickup, dropoff, onBack }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRide, setSelectedRide] = useState(rides[3]); // Default to Connect Auto
  const [fares, setFares] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFares = async () => {
      try {
        setLoading(true);
        const response = await getFares(pickup, dropoff);

        // Map API fares to existing rides data
        const updatedRides = rides.map((ride) => {
          let fareType;
          switch (ride.name) {
            case "Connect Auto":
              fareType = "auto";
              break;
            case "Premier":
              fareType = "car";
              break;
            case "Connect Moto":
              fareType = "motorcycle";
              break;
            default:
              fareType = "auto";
          }

          return {
            ...ride,
            price: response.data.data.fares[fareType],
          };
        });

        console.log("Updated Rides:", updatedRides);

        setFares(response.data.data.fares);
        setSelectedRide(updatedRides[3]); // Reset to default ride with live fare

        // Mutate the original rides array to update the global state
        rides.length = 0;
        rides.push(...updatedRides);
      } catch (err) {
        console.error("Error fetching fares:", err);
        setError("Failed to fetch fare information");
      } finally {
        setLoading(false);
      }
    };

    if (pickup && dropoff) {
      fetchFares();
    }
  }, [pickup, dropoff]);

  const handleBackFromRides = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <RideConfirmation
        pickup={pickup}
        dropoff={dropoff}
        onCancel={() => setShowConfirmation(false)}
      />
    );
  }

  if (showConfirm) {
    return (
      <RideConfirm
        selectedRide={selectedRide}
        pickup={pickup}
        onNext={() => {
          setShowConfirm(false);
          setShowConfirmation(true);
        }}
        onBack={handleBackFromRides}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-5 w-5" />
              <span>Pickup now</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>For me</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-2 border-y border-green-100">
        <span className="text-green-700 text-sm">23% promotion applied</span>
      </div>

      {/* Ride options */}
      <div className="flex-1 overflow-auto px-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            onClick={() => handleRideSelect(ride)}
            className={`my-2 cursor-pointer transition-all ${
              selectedRide.id === ride.id
                ? "border-2 border-gray-900 rounded-lg"
                : "border border-transparent"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img src={ride.icon} alt={ride.name} className="w-16 h-16" />
                <div>
                  <h3 className="text-lg font-semibold">{ride.name}</h3>
                  <p className="text-gray-500 text-sm">{ride.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{ride.price}</p>
                <p className="text-gray-500 text-sm">{ride.eta} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Confirm {selectedRide.name}
        </button>
      </div>
    </div>
  );
};

export default RideOptions;
