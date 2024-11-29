import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Menu,
  ChevronDown,
  User,
  Circle,
  Square,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const mapImageUrl =
    "https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Logo for mobile */}
            <div className="md:hidden">
              <span className="text-black text-xl font-bold">
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
            <div className="ml-auto flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full md:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Input Section - Mobile & Desktop */}
        <div className="w-full md:w-[400px] bg-white z-10">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="px-4 pt-16 bg-white">
              <h1 className="text-3xl font-bold mb-4">Get a ride</h1>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Circle className="h-5 w-5 text-gray-600 fill-current" />
                  </div>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Square className="h-5 w-5 text-gray-600 fill-current" />
                  </div>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Dropoff location"
                    className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none"
                  />
                </div>

                <button className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-black">Pickup now</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>

                <button className="w-full bg-black text-white p-4 rounded-lg font-medium text-base">
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
        <div className="flex-1 h-[calc(100vh-320px)] md:h-screen">
          <img
            src={mapImageUrl}
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
