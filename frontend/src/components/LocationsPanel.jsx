import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circle, MapPin, Square } from "lucide-react";
import LocationSearchPanel from "./LocationSearchPanel";
import LocationItem from "./LocationItem";

export const LocationsPanel = ({
  isOpen,
  onClose,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
}) => {
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'dropoff'
  const [showSearchPanel, setShowSearchPanel] = useState(false);
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
    setShowSearchPanel(false);
    setActiveInput(null);
  };

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setShowSearchPanel(true);
  };

  return (
    <>
      <div
        ref={panelRef}
        className="fixed inset-0 bg-white z-50 transform translate-y-full locations-panel"
        style={{ height: "calc(100vh - 56px)", top: "56px" }}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="space-y-4">
            {/* Search inputs */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Circle className="h-5 w-5 text-gray-600 fill-current" />
              </div>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => handleInputFocus("pickup")}
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
                onFocus={() => handleInputFocus("dropoff")}
                placeholder="Dropoff location"
                className="w-full bg-gray-100 p-4 pl-12 rounded-lg focus:outline-none"
              />
            </div>

            {/* Search Panel */}
            {showSearchPanel && (
              <LocationSearchPanel
                isOpen={showSearchPanel}
                searchQuery={activeInput === "pickup" ? pickup : dropoff}
                onLocationSelect={handleLocationSelect}
                onBack={() => {
                  setShowSearchPanel(false);
                  setActiveInput(null);
                }}
                activeInput={activeInput}
                setPickup={setPickup}
                setDropoff={setDropoff}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
