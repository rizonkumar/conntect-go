import React, { useRef, useState, useEffect, useCallback } from "react";
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
import { debounce } from "lodash";

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

  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getLocationSuggestions(query);

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
    }, 500),
    []
  );

  useEffect(() => {
    if (isSearchMode) {
      debouncedFetchSuggestions(searchQuery);
    }
  }, [searchQuery, isSearchMode, debouncedFetchSuggestions]);

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

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-white z-50 transform translate-y-full"
      style={{ height: "100vh" }}
    >
      {isSearchMode ? (
        // Search Mode UI
        <div className="h-full flex flex-col">
          {/* Enhanced Search Header */}
          <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
            <div className="flex items-center gap-4 p-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder={`Enter ${
                    activeInput === "pickup" ? "pickup" : "dropoff"
                  } location`}
                  className="w-full bg-gray-50 p-4 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={clearInput}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-all"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Search Results */}
          <div className="flex-1 overflow-y-auto px-4 pt-20 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent"></div>
                <span className="text-gray-600">Searching locations...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map((location) => (
                  <div
                    key={location.place_id}
                    onClick={() => handleLocationSelect(location)}
                    className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all border border-gray-100 hover:border-gray-200"
                  >
                    <div className="p-2.5 bg-blue-50 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {location.description}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {location.structured_formatting?.secondary_text || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  No locations found for "{searchQuery}"
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // Main Panel UI
        <div className="flex flex-col h-full bg-gray-50">
          {/* Enhanced Header */}
          <div className="px-6 pt-6 pb-4 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Get a ride</h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Enhanced Location Inputs */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blue-50 rounded-full">
                  <Circle className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => handleInputFocus("pickup")}
                  placeholder="Pickup location"
                  className="w-full bg-white p-4 pl-16 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blue-50 rounded-full">
                  <Square className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  onFocus={() => handleInputFocus("dropoff")}
                  placeholder="Dropoff location"
                  className="w-full bg-white p-4 pl-16 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Enhanced Time Selector */}
              <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Pickup now</span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </button>

              {/* Enhanced Search Button */}
              {pickup && dropoff && (
                <button
                  onClick={handleSearch}
                  className="w-full bg-black text-white p-4 rounded-xl font-medium text-lg hover:bg-gray-900 active:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          {/* Map Preview Area (Optional) */}
          <div className="flex-1 bg-gray-100">
            {/* Add map preview here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPanel;
