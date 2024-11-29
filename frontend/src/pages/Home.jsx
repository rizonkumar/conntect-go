import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MapPin,
  Clock,
  Menu,
  ChevronDown,
  User,
  Circle,
  Square,
} from "lucide-react";
import { LocationsPanel } from "../components/LocationsPanel";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!pickup || !dropoff) {
      alert("Please enter pickup and dropoff locations");
      return;
    }

    // Close the panel if it's open
    setPanelOpen(false);

    // Here you would typically:
    // 1. Call your backend API
    // 2. Calculate route
    // 3. Show available rides
    // 4. Navigate to next screen

    console.log("Searching ride from", pickup, "to", dropoff);
  };

  const mapImageUrl =
    "https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelOpen && !event.target.closest(".locations-panel")) {
        setPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center h-16 md:h-14">
            {/* Logo for mobile */}
            <div className="md:hidden">
              <span className="text-black text-2xl font-bold">
                Connect<span className="text-blue-500">Go</span>
              </span>
            </div>

            {/* Logo and nav for desktop */}
            <div className="hidden md:flex items-center gap-8">
              <span className="text-black text-xl font-bold cursor-pointer">
                Connect<span className="text-blue-500">Go</span>
              </span>
              <div className="flex gap-6">
                <button className="font-medium text-sm py-2 border-b-2 border-black">
                  Ride
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-3">
              <button className="p-2.5 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-full md:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row min-h-screen pt-16">
        {/* Input Section - Mobile & Desktop */}
        <div className="w-full md:w-[400px] bg-white z-10">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="px-5 py-6 bg-white">
              <h1 className="text-4xl font-bold mb-6">Get a ride</h1>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Circle className="h-5 w-5 text-gray-600 fill-current" />
                  </div>
                  <input
                    type="text"
                    value={pickup}
                    onClick={() => setPanelOpen(true)}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full bg-gray-100 p-5 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Square className="h-5 w-5 text-gray-600 fill-current" />
                  </div>
                  <input
                    type="text"
                    value={dropoff}
                    onClick={() => setPanelOpen(true)}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Dropoff location"
                    className="w-full bg-gray-100 p-5 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                <button className="w-full flex items-center justify-between p-5 bg-gray-100 rounded-xl active:bg-gray-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-black text-base">Pickup now</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>

                <button 
                  onClick={submitHandler}
                  className="w-full bg-black text-white p-5 rounded-xl font-medium text-base active:bg-gray-800 mt-2">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block bg-white h-full p-6">
            <h1 className="text-[22px] font-bold mb-6">Get a ride</h1>
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Circle className="h-5 w-5 text-gray-600 fill-current" />
                </div>
                <input
                  type="text"
                  value={pickup}
                  onClick={() => setPanelOpen(true)}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup location"
                  className="w-full bg-gray-100 p-3 pl-12 rounded-lg focus:outline-none"
                />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Square className="h-5 w-5 text-gray-600 fill-current" />
                </div>
                <input
                  type="text"
                  value={dropoff}
                  onClick={() => setPanelOpen(true)}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Dropoff location"
                  className="w-full bg-gray-100 p-3 pl-12 rounded-lg focus:outline-none"
                />
              </div>
              <button className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg w-full">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="flex-1 text-left">Pickup now</span>
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </button>
              <button className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 h-[calc(100vh-380px)] md:h-screen relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-16 z-10 pointer-events-none md:hidden"></div>
          <img
            src={mapImageUrl}
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
      <LocationsPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        pickup={pickup}
        setPickup={setPickup}
        dropoff={dropoff}
        setDropoff={setDropoff}
      />
    </div>
  );
};

export default Home;
