// PickupContainer.jsx
import React, { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // Import both icons
import PickupMap from "./PickupMap";
import PickupDetails from "./PickupDetails";
import { pickupDirections } from "../../../constants/data";

const PickupContainer = ({ pickup, onBack }) => {
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const deltaY = touchStartY.current - e.touches[0].clientY;
    if (deltaY > 50 && !showDetails) {
      setShowDetails(true);
    } else if (deltaY < -50 && showDetails) {
      setShowDetails(false);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="h-screen overflow-hidden relative"
    >
      {!showDetails ? (
        <div className="relative h-full">
          <PickupMap
            pickup={pickup}
            onBack={onBack}
            distance={pickupDirections.currentLocation.distance}
            instruction={pickupDirections.currentLocation.instruction}
          />
          <div className="fixed bottom-32 left-0 right-0 z-[60] hidden md:block">
            <button
              onClick={toggleDetails}
              className="mx-auto flex items-center justify-center bg-white rounded-full w-12 h-12 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <PickupDetails
            pickup={pickup}
            eta={pickupDirections.eta}
            distance={pickupDirections.distance}
            fare={pickupDirections.fare}
            directions={pickupDirections.directions}
          />
          <div className="fixed top-20 left-0 right-0 z-[60] hidden md:block">
            <button
              onClick={toggleDetails}
              className="mx-auto flex items-center justify-center bg-white rounded-full w-12 h-12 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PickupContainer;
