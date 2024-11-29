import React from "react";
import { MapPin, ArrowLeft } from "lucide-react";

const RideConfirm = ({ selectedRide, pickup, onNext, onBack }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-100">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Confirmation Panel */}
      <div className="bg-white p-4 space-y-4">
        <h2 className="text-lg font-semibold">Confirm your Ride</h2>

        <div className="flex gap-4">
          <img
            src={selectedRide.icon}
            alt={selectedRide.name}
            className="w-16 h-16 object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{pickup}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-[#27B14C] text-white py-3 rounded-lg font-medium"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RideConfirm;
