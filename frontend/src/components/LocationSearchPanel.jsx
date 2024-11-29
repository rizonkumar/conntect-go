import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MapPin, ArrowLeft, X } from "lucide-react";
import { sampleLocations } from "../../constants/data";

const LocationSearchPanel = ({
  isOpen,
  searchQuery,
  onLocationSelect,
  onBack,
  activeInput,
  setPickup,
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

  const handleInputChange = (e) => {
    if (activeInput === "pickup") {
      setPickup(e.target.value);
    } else {
      setDropoff(e.target.value);
    }
  };

  const clearInput = () => {
    if (activeInput === "pickup") {
      setPickup("");
    } else {
      setDropoff("");
    }
  };

  const filteredLocations = searchQuery
    ? sampleLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-white z-50 transform translate-y-full"
      style={{ height: "100vh", top: "0" }}
    >
      {/* Header with back button and search input */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={`Enter ${activeInput === "pickup" ? "pickup" : "dropoff"} location`}
              className="w-full bg-gray-100 p-3 pr-10 rounded-lg focus:outline-none"
            />
            {searchQuery && (
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
        {searchQuery && filteredLocations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No locations found for "{searchQuery}"
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => onLocationSelect(location)}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
