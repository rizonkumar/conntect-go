import React from "react";
import { Power, Circle, Square, CreditCard, ArrowLeft } from "lucide-react";
import { rideRequests, rideDetails } from "../../../constants/data";

const RideRequest = ({ onBack, onToggleOnline, isOnline, onAcceptRide }) => {
  const handleAcceptRide = () => {
    // Pass the rideDetails when accepting a ride
    onAcceptRide(rideDetails);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative">
            <Power className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          </div>
          <span className="font-medium">Online</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={onToggleOnline}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-green-500 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="fixed top-[60px] left-0 right-0 bg-orange-500 text-white p-3 text-center z-40">
        You have {rideRequests.length} new requests.
      </div>

      {/* Ride Requests List */}
      <div className="pt-[120px] pb-4 px-4 md:max-w-2xl md:mx-auto">
        <div className="space-y-4">
          {rideRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={request.passenger.image}
                      alt={request.passenger.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{request.passenger.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          {request.passenger.paymentMethod}
                        </span>
                        {request.passenger.hasDiscount && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                            Discount
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${request.ride.fare.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.ride.distance} km
                    </p>
                  </div>
                </div>
              </div>

              {/* Ride Details */}
              <div className="p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">PICK UP</p>
                    <p className="text-sm font-medium">{request.ride.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Square className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      DROP OFF
                    </p>
                    <p className="text-sm font-medium">
                      {request.ride.dropoff}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-yellow-400 p-3 font-medium hover:bg-yellow-500 transition-colors"
                onClick={handleAcceptRide}
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
