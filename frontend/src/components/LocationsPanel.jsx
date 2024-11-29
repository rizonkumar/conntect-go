import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Circle,
  Square,
  ArrowLeft,
  X,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { sampleLocations } from "../../constants/data";

export const LocationsPanel = ({
  isOpen,
  onClose,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  onSearch,
}) => {
  const [activeInput, setActiveInput] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const panelRef = useRef(null);

  useGSAP(() => {
    gsap.to(panelRef.current, {
      y: isOpen ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  const handleLocationSelect = (location) => {
    if (activeInput === "pickup") {
      setPickup(location.name);
    } else {
      setDropoff(location.name);
    }
    setIsSearchMode(false);
    setActiveInput(null);
  };

  const handleBack = () => {
    setIsSearchMode(false);
    setActiveInput(null);
  };

  const clearInput = () => {
    if (activeInput === "pickup") {
      setPickup("");
    } else {
      setDropoff("");
    }
  };

  const handleSearch = () => {
    onClose();
    onSearch();
  };

  const filteredLocations =
    activeInput === "pickup"
      ? sampleLocations.filter(
          (location) =>
            location.name.toLowerCase().includes(pickup.toLowerCase()) ||
            location.address.toLowerCase().includes(pickup.toLowerCase())
        )
      : sampleLocations.filter(
          (location) =>
            location.name.toLowerCase().includes(dropoff.toLowerCase()) ||
            location.address.toLowerCase().includes(dropoff.toLowerCase())
        );

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-white z-50 transform translate-y-full locations-panel"
      style={{ height: "calc(100vh)" }}
    >
      {!isSearchMode ? (
        <div className="flex flex-col h-full">
          <div className="px-4 pt-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold mb-6">Get a ride</h1>{" "}
            <div className="space-y-4 pb-4">
              {/* Pickup Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Circle className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => {
                    setActiveInput("pickup");
                    setIsSearchMode(true);
                  }}
                  placeholder="Pickup location"
                  className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none"
                />
              </div>

              {/* Dropoff Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Square className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  onFocus={() => {
                    setActiveInput("dropoff");
                    setIsSearchMode(true);
                  }}
                  placeholder="Dropoff location"
                  className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none"
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
              {pickup && dropoff && (
                <button
                  onClick={handleSearch}
                  className="w-full bg-black text-white p-4 rounded-lg font-medium"
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full">
          {/* Search Header */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3 p-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={activeInput === "pickup" ? pickup : dropoff}
                  onChange={(e) =>
                    activeInput === "pickup"
                      ? setPickup(e.target.value)
                      : setDropoff(e.target.value)
                  }
                  placeholder={`Enter ${
                    activeInput === "pickup" ? "pickup" : "dropoff"
                  } location`}
                  className="w-full bg-gray-100 p-3 pr-10 rounded-lg focus:outline-none"
                  autoFocus
                />
                {(activeInput === "pickup" ? pickup : dropoff) && (
                  <button
                    onClick={clearInput}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="mt-20 p-4">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{location.name}</h4>
                    <p className="text-sm text-gray-500">
                      {location.fullAddress}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No locations found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPanel;
