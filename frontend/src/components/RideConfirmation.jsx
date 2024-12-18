import { useState, useEffect } from "react";
import { Shield, Share2, Phone } from "lucide-react";
import { useSocket } from "../context/SocketContext";

const RideConfirmation = ({ pickup, dropoff, onCancel }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const socket = useSocket();
  const [acceptedRide, setAcceptedRide] = useState(null);

  useEffect(() => {
    let mounted = true;
    let timerId;

    const handleRideAccepted = (acceptedRideData) => {
      console.log("Received ride acceptance:", acceptedRideData);
      if (mounted) {
        setIsSearching(false);
        setAcceptedRide(acceptedRideData);
        if (timerId) clearInterval(timerId);
      }
    };

    if (socket) {
      console.log("Setting up socket listeners");
      socket.on("ride:accepted", handleRideAccepted);

      socket.io.on("reconnect", () => {
        console.log("Socket reconnected");
      });
    }

    if (isSearching && timeLeft > 0) {
      timerId = setInterval(() => {
        if (mounted) {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setShowCancelConfirm(true);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      mounted = false;
      if (timerId) clearInterval(timerId);
      if (socket) {
        console.log("Cleaning up socket listeners");
        socket.off("ride:accepted", handleRideAccepted);
        socket.io.off("reconnect");
      }
    };
  }, [socket, isSearching, timeLeft]);

  useEffect(() => {
    if (socket) {
      console.log("Socket connected:", socket.connected);
    }
  }, [socket]);

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
          {/* Header with Search Status and Timer */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-medium">
                Looking for nearby drivers
              </h2>
              <p className="text-gray-500">Time remaining: {timeLeft}s</p>
            </div>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Cancel
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
              <div>
                <h3 className="font-medium">{pickup}</h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
              <div>
                <h3 className="font-medium">{dropoff}</h3>
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
              <h3 className="text-lg font-medium">Cancel Ride?</h3>
              <p className="text-gray-600">
                No drivers found nearby. Would you like to cancel the ride?
              </p>
              <div className="space-y-2">
                <button
                  onClick={onCancel}
                  className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, Cancel Ride
                </button>
                <button
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setTimeLeft(30);
                    setIsSearching(true);
                  }}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Keep Searching
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If ride is accepted
  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={acceptedRide?.captain?.image || "/default-avatar.png"}
                alt="Captain"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-medium">{acceptedRide?.captain?.name}</h2>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                    {acceptedRide?.captain?.vehicle?.vehicleType}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                    {acceptedRide?.captain?.vehicle?.plate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b">
          <button className="flex flex-col items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <Phone className="h-6 w-6" />
            </div>
            <span className="text-sm mt-1">Call</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <Share2 className="h-6 w-6" />
            </div>
            <span className="text-sm mt-1">Share</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
            <span className="text-sm mt-1">Safety</span>
          </button>
        </div>

        {/* Ride Details */}
        <div className="flex-1 p-4">{/* Add ride details here */}</div>
      </div>
    </div>
  );
};

export default RideConfirmation;
