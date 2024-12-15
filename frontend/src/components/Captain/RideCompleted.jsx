import { CheckCircle, Clock } from "lucide-react";

const RideCompleted = ({ fare, duration, distance, onFindNewRides }) => {
  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col">
      {/* Header with Checkmark */}
      <div className="p-6 text-center">
        <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Ride Completed!</h1>
        <p className="text-gray-600">Payment has been received</p>
      </div>

      {/* Stats */}
      <div className="flex-1 p-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            {/* Earned */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-full">
                <span className="text-2xl">💵</span>
              </div>
              <div>
                <p className="text-gray-600">Earned</p>
                <p className="text-2xl font-bold">${fare}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="text-2xl font-bold">{duration} min</p>
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-orange-100 rounded-full">
              <span className="text-xl">🛵</span>
            </div>
            <div>
              <p className="text-gray-600">Distance</p>
              <p className="text-2xl font-bold">{distance} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Find New Rides Button */}
      <div className="p-4">
        <button
          onClick={onFindNewRides}
          className="w-full bg-black text-white py-4 rounded-lg font-medium"
        >
          Find New Rides
        </button>
      </div>
    </div>
  );
};

export default RideCompleted;
