import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circle, MapPin, Square } from "lucide-react";

export const LocationsPanel = ({
  isOpen,
  onClose,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
}) => {
  const panelRef = useRef(null);

  useGSAP(() => {
    gsap.to(panelRef.current, {
      y: isOpen ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  return (
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

          {/* Saved Places Section */}
          <div className="mt-6">
            <h3 className="font-medium text-base mb-4">Saved places</h3>
            <div className="space-y-4">
              {/* Location Items */}
              <LocationItem
                title="Allow location access"
                subtitle="It provides your pickup address"
                icon={<MapPin className="h-5 w-5" />}
              />
              <LocationItem
                title="Set location on map"
                icon={<MapPin className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for location items
const LocationItem = ({ title, subtitle, icon }) => (
  <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="font-medium">{title}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);
