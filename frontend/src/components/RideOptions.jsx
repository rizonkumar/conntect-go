import React, { useState } from "react";
import { Clock, User } from "lucide-react";
import { rides } from "../../constants/data";
import RideConfirmation from "./RideConfirmation";

const RideOptions = ({ pickup, dropoff, onBack }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  if (showConfirmation) {
    return (
      <RideConfirmation
        pickup={pickup}
        dropoff={dropoff}
        onCancel={() => setShowConfirmation(false)}
      />
    );
  }
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header with route info */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between mb-4">
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
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Pickup now</span>
            <User className="h-5 w-5" />
            <span>For me</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium">To: {dropoff}</div>
          <div className="text-gray-500">From: {pickup}</div>
        </div>
      </div>

      {/* Promotion banner */}
      <div className="bg-green-50 p-3 flex items-center">
        <span className="text-green-600 text-sm">🎉 8% promotion applied</span>
      </div>

      {/* Ride options */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:border-black cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{ride.icon}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{ride.name}</h3>
                  <span className="text-sm text-gray-500">{ride.time}</span>
                </div>
                <p className="text-sm text-gray-500">{ride.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <span className="text-green-600 text-sm">↓</span>
                <span className="font-medium">₹{ride.price.toFixed(2)}</span>
              </div>
              <span className="text-sm text-gray-500 line-through">
                ₹{ride.originalPrice.toFixed(2)}
              </span>
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
          onClick={() => setShowConfirmation(true)}
        >
          Request Connect Go Auto
        </button>
      </div>
    </div>
  );
};

export default RideOptions;
