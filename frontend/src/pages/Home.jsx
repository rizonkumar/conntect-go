import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Circle, Square, Clock, ChevronDown } from "lucide-react";
import { LocationsPanel } from "../components/LocationsPanel";
import RideOptions from "../components/RideOptions";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(false);

  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!pickup || !dropoff) {
      alert("Please enter pickup and dropoff locations");
      return;
    }

    setPanelOpen(false);
    setShowRideOptions(true);
    console.log("Searching ride from", pickup, "to", dropoff);
  };

  const handleBackFromRides = () => {
    setShowRideOptions(false);
  };

  const mapImageUrl =
    "https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center h-14">
            <div className="md:hidden">
              <span className="text-black text-2xl font-bold">
                Connect<span className="text-blue-500">Go</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <span className="text-black text-xl font-bold cursor-pointer">
                Connect<span className="text-blue-500">Go</span>
              </span>
              <button className="font-medium text-sm py-2 border-b-2 border-black">
                Ride
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row min-h-screen pt-14">
        {/* Input Section */}
        <div className="w-full md:w-[400px] bg-white z-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Get a ride</h1>
            <div className="space-y-4">
              {/* Pickup Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Circle className="h-5 w-5 text-gray-600 fill-current" />
                </div>
                <input
                  type="text"
                  value={pickup}
                  onClick={() => setPanelOpen(true)}
                  readOnly
                  placeholder="Pickup location"
                  className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none cursor-pointer"
                />
              </div>

              {/* Dropoff Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Square className="h-5 w-5 text-gray-600 fill-current" />
                </div>
                <input
                  type="text"
                  value={dropoff}
                  onClick={() => setPanelOpen(true)}
                  readOnly
                  placeholder="Dropoff location"
                  className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none cursor-pointer"
                />
              </div>

              {/* Time Selector */}
              <button className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Pickup now</span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </button>

              {/* Search Button */}
              <button
                onClick={submitHandler}
                className="w-full bg-black text-white p-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 h-[calc(100vh-64px)] md:h-screen relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-16 z-10 pointer-events-none md:hidden"></div>
          <img
            src={mapImageUrl}
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>
      </main>

      {/* Location Selection Panel */}
      <LocationsPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        pickup={pickup}
        setPickup={setPickup}
        dropoff={dropoff}
        setDropoff={setDropoff}
        onSearch={submitHandler}
        className="h-[calc(100vh-56px)]"
      />

      {/* Ride Options Panel */}
      {showRideOptions && (
        <RideOptions
          pickup={pickup}
          dropoff={dropoff}
          onBack={handleBackFromRides}
        />
      )}
    </div>
  );
};

export default Home;
