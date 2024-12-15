import { ArrowLeft } from "lucide-react";

const PickupMap = ({ pickup, onBack, distance, instruction }) => {
  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-medium">Pick up</span>
      </div>

      {/* Navigation Instruction Banner */}
      <div className="bg-orange-500 text-white px-4 py-2 flex items-center gap-2">
        <span className="rotate-90">↱</span>
        <div className="flex-1">
          <span className="mr-2">{distance}</span>
          <span>{instruction}</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="h-[calc(100vh-180px)] bg-gray-100">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pickup Location Pill */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <div>
            <p className="text-sm text-gray-500">Pick up at</p>
            <p className="font-medium">{pickup.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupMap;
