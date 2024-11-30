import React from "react";
import { CheckCircle, Navigation, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RideCompleted = ({ fare, duration, distance }) => {
  const navigate = useNavigate();

  const handleFindNewRides = () => {
    navigate("/captain-home");
  };

  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Ride Completed!</h1>
        <p className="text-gray-600">Payment has been received</p>
      </div>

      {/* Ride Summary */}
      <div className="p-6 flex-1">
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Earned</p>
                <p className="text-xl font-bold">${fare}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-xl font-bold">{duration} min</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <Navigation className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-xl font-bold">{distance} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t">
        <button
          onClick={handleFindNewRides}
          className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Find New Rides
        </button>
      </div>
    </div>
  );
};

export default RideCompleted;
