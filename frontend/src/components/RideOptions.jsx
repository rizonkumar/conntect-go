import React, { useState, useCallback } from "react";
import { Clock, User } from "lucide-react";
import { rides } from "../../constants/data";
import RideConfirmation from "./RideConfirmation";
import RideConfirm from "./RideConfirm";

const RideOptions = ({ pickup, dropoff, onBack }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRide, setSelectedRide] = useState(rides[3]); // Default to Connect Auto

  const handleBackFromRides = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
  };

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
                <img
                  src={ride.icon}
                  alt={ride.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{ride.name}</h3>
                    <span className="text-sm text-gray-500">{ride.time}</span>
                  </div>
                  <p className="text-sm text-gray-500">{ride.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-green-600 text-sm">↓</span>
                  <span className="font-medium">₹{ride.price}</span>
                </div>
                <span className="text-sm text-gray-500 line-through">
                  ₹{ride.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💵</span>
            <span>Cash</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-medium"
          onClick={() => setShowConfirm(true)}
        >
          Request {selectedRide.name}
        </button>
      </div>
    </div>
  );
};

export default RideOptions;
