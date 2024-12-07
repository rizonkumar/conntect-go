import React, { useRef, useState, useEffect } from "react";
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
import { getLocationSuggestions } from "../api/captainApi";

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
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef(null);

  useGSAP(() => {
    gsap.to(panelRef.current, {
      y: isOpen ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getLocationSuggestions(input);

      if (response.data.status === "success") {
        setSuggestions(response.data.data.suggestions);
      } else {
        console.error("Failed to fetch suggestions:", response.data.message);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearchMode) {
      fetchSuggestions(searchQuery);
    }
  }, [searchQuery, isSearchMode]);

  const handleLocationSelect = (location) => {
    if (activeInput === "pickup") {
      setPickup(location.description);
    } else {
      setDropoff(location.description);
    }
    setIsSearchMode(false);
    setActiveInput(null);
    setSearchQuery("");
  };

  const handleBack = () => {
    setIsSearchMode(false);
    setActiveInput(null);
    setSearchQuery("");
  };

  const clearInput = () => {
    setSearchQuery("");
    if (activeInput === "pickup") {
      setPickup("");
    } else {
      setDropoff("");
    }
  };

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setIsSearchMode(true);
    setSearchQuery(inputType === "pickup" ? pickup : dropoff);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onClose();
    onSearch();
  };

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
                  onFocus={() => handleInputFocus("pickup")}
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
                  onFocus={() => handleInputFocus("dropoff")}
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
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder={`Enter ${
                    activeInput === "pickup" ? "pickup" : "dropoff"
                  } location`}
                  className="w-full bg-gray-100 p-3 pr-10 rounded-lg focus:outline-none"
                  autoFocus
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
          <div className="flex-1 overflow-y-auto px-4">
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">
                Loading suggestions...
              </div>
            ) : searchQuery && suggestions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No locations found for "{searchQuery}"
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((location) => (
                  <div
                    key={location.place_id}
                    className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="p-2 bg-gray-100 rounded-full">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{location.description}</h4>
                      <p className="text-sm text-gray-500">
                        {location.structured_formatting?.secondary_text || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPanel;
