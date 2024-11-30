import React, { useState, useRef, useEffect } from "react";
import PickupMap from "./PickupMap";
import PickupDetails from "./PickupDetails";

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

  const directions = [
    {
      instruction: "Head southwest on Madison St",
      distance: "18",
      icon: "↑",
    },
    {
      instruction: "Turn left onto 4th Ave",
      distance: "12",
      icon: "↰",
    },
    // ... add more directions
  ];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="h-screen overflow-hidden"
    >
      {!showDetails ? (
        <PickupMap pickup={pickup} onBack={onBack} distance={250} />
      ) : (
        <PickupDetails
          pickup={pickup}
          eta={5}
          distance={2.2}
          fare={25.0}
          directions={directions}
        />
      )}
    </div>
  );
};

export default PickupContainer;
