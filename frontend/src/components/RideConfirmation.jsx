import React, { useState, useEffect } from "react";
import { Shield, Share2, Phone } from "lucide-react";
import {
  dummyDriverData,
  dummyRideData,
  actionButtons,
  cancelMessages,
} from "../../constants/data";

const RideConfirmation = ({ pickup, dropoff, onCancel }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Use real pickup/dropoff if provided, otherwise use dummy data
  const pickupLocation = pickup || dummyRideData.locations.pickup.name;
  const dropoffLocation = dropoff || dummyRideData.locations.dropoff.name;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (isSearching) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-lg shadow-lg"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 space-y-4">
          {/* Header with Search Status and Cancel Button for Desktop */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium">Looking for nearby drivers</h2>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="hidden md:block text-red-500 hover:text-red-600 font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
              <div>
                <h3 className="font-medium">{pickupLocation}</h3>
                <p className="text-sm text-gray-500">
                  {dummyRideData.locations.pickup.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
              <div>
                <h3 className="font-medium">{dropoffLocation}</h3>
                <p className="text-sm text-gray-500">
                  {dummyRideData.locations.dropoff.address}
                </p>
              </div>
            </div>
          </div>

          {/* Cancel Button for Mobile */}
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full py-3 bg-gray-100 text-red-500 rounded-lg md:hidden"
          >
            Cancel Search
          </button>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
            <div className="bg-white w-full md:w-[400px] md:rounded-xl rounded-t-xl p-4 space-y-4">
              <h3 className="text-lg font-medium">{cancelMessages.title}</h3>
              <p className="text-gray-600">{cancelMessages.description}</p>
              <div className="space-y-2">
                <button
                  onClick={onCancel}
                  className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  {cancelMessages.buttons.confirm}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {cancelMessages.buttons.reject}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        {/* Fixed Header */}
        <div className="bg-white">
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-medium">Meet at {pickupLocation}</h2>
            <div className="bg-black text-white px-2 py-1 rounded text-sm">
              {dummyDriverData.eta}
              <span className="text-xs ml-1">min</span>
            </div>
          </div>

          <div className="px-4 py-2 border-t border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Share PIN with Driver</span>
                <button className="text-gray-500">ⓘ</button>
              </div>
              <div className="flex gap-1">
                {dummyDriverData.pin.map((digit, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Driver Info */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={dummyDriverData.image}
                    alt={dummyDriverData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dummyDriverData.name}</span>
                    <span className="text-gray-700">
                      {dummyDriverData.vehicleNumber}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {dummyDriverData.vehicleType} • {dummyDriverData.rating} ★
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-3">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 p-4 border-b">
            {actionButtons.map((button) => {
              const IconComponent = { Shield, Share2, Phone }[button.icon];
              return (
                <button key={button.id} className="flex flex-col items-center">
                  <div className="p-3 bg-gray-100 rounded-full mb-1">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm">{button.name}</span>
                </button>
              );
            })}
          </div>

          {/* Location Details */}
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-medium">{pickupLocation}</h4>
              <p className="text-sm text-gray-500">
                {dummyRideData.locations.pickup.address}
              </p>
            </div>
            <div>
              <h4 className="font-medium">{dropoffLocation}</h4>
              <p className="text-sm text-gray-500">
                {dummyRideData.locations.dropoff.address}
              </p>
            </div>

            <button className="w-full py-3 px-4 bg-black text-white rounded-lg">
              Edit or add stops
            </button>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="bg-white border-t p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium">₹{dummyRideData.price}</span>
            <span className="text-gray-500">{dummyRideData.paymentMethod}</span>
          </div>
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full py-3 bg-gray-100 text-red-500 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-xl p-4 space-y-4">
            <h3 className="text-lg font-medium">{cancelMessages.title}</h3>
            <p className="text-gray-600">{cancelMessages.description}</p>
            <div className="space-y-2">
              <button
                onClick={onCancel}
                className="w-full py-3 bg-red-500 text-white rounded-lg"
              >
                {cancelMessages.buttons.confirm}
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg"
              >
                {cancelMessages.buttons.reject}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideConfirmation;
