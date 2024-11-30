import React, { useState } from "react";
import InactiveStatus from "../components/Captain/InactiveStatus";
import { captainStats } from "../../constants/data";
import ActiveStatus from "../components/Captain/ActiveStatus";

const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(false);

  const handleGoOnline = () => {
    setIsOnline(true);
  };

  return (
    <div>
      {/* Component for When Captain Status is inactive */}
      {!isOnline && (
        <InactiveStatus {...captainStats} onGoOnline={handleGoOnline} />
      )}
      {/* Component for When Captain Status is active with Accept and Ignore Rides */}
      {isOnline && <ActiveStatus />}
      {/* Component when captain ignore the ride we will show all incoming rides request with Accept and Ignore Button - All Rides in List format */}

      {/* Component when captain accept the ride  with go to pick up component*/}

      {/* Pickup Component with Map */}
      {/* Pickup component when capatin scroll up - we will hide the map and show the other detail like pickup at, ETA, DIStance and Fare, Dropoff button and location suggestion */}
    </div>
  );
};

export default CaptainHome;
