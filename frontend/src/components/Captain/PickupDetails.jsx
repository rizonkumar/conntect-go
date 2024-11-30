// PickupDetails.jsx
import React, { useState } from "react";
import { MapPin, Clock, DollarSign } from "lucide-react";
import RideComplete from "./RideComplete";
import RideCompleted from "./RideCompleted";

const PickupDetails = ({
  pickup,
  eta,
  distance,
  fare,
  directions,
  onFindNewRides,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleDropOff = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentMethod) => {
    setShowPaymentModal(false);
    setShowCompleted(true);
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">EST</p>
            <p className="font-bold text-xl">{eta} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-bold text-xl">{distance} km</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fare</p>
            <p className="font-bold text-xl">${fare}</p>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div className="p-4 bg-orange-50 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <div>
            <p className="text-sm text-gray-500">Pick up at</p>
            <p className="font-medium">{pickup.address}</p>
          </div>
        </div>
      </div>

      {/* Directions */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {directions.map((direction, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded">{direction.icon}</div>
              <div>
                <p className="font-medium">{direction.instruction}</p>
                <p className="text-sm text-gray-500">
                  {direction.distance} miles
                </p>
                {direction.note && (
                  <p className="text-sm text-gray-400">{direction.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <button
          className="w-full bg-black text-white py-4 rounded-lg font-medium"
          onClick={handleDropOff}
        >
          DROP OFF
        </button>
      </div>

      {/* First show payment modal */}
      {showPaymentModal && (
        <RideComplete
          fare={fare}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      {/* Then show completed screen */}
      {showCompleted && (
        <RideCompleted
          fare={fare}
          duration={25}
          distance={distance}
          onFindNewRides={onFindNewRides}
        />
      )}
    </div>
  );
};

export default PickupDetails;
