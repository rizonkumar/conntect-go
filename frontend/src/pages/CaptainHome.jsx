import React, { useState } from "react";
import InactiveStatus from "../components/Captain/InactiveStatus";
import { captainStats, rideDetails } from "../../constants/data";
import ActiveStatus from "../components/Captain/ActiveStatus";
import RideRequest from "../components/Captain/RideRequest";
import AcceptedRideDetails from "../components/Captain/AcceptedRideDetails";

const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showRideRequests, setShowRideRequests] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(null);

  const handleGoOnline = () => {
    setIsOnline(true);
  };

  const handleGoOffline = () => {
    setIsOnline(false);
    setShowRideRequests(false);
    setAcceptedRide(null);
  };

  const handleIgnoreRide = () => {
    setShowRideRequests(true);
  };

  const handleBackFromRequests = () => {
    setShowRideRequests(false);
  };

  const handleAcceptRide = (ride) => {
    setAcceptedRide(ride);
    setShowRideRequests(false);
  };

  const handleCancelRide = () => {
    setAcceptedRide(null);
  };

  const handleGoToPickup = () => {
    // Handle the navigation to the pickup location
    console.log("Navigating to pickup location");
  };

  return (
    <div>
      {/* Component for When Captain Status is inactive */}
      {!isOnline && (
        <InactiveStatus {...captainStats} onGoOnline={handleGoOnline} />
      )}
      {/* Component for When Captain Status is active with Accept and Ignore Rides */}
      {isOnline && !showRideRequests && !acceptedRide && (
        <ActiveStatus
          onIgnore={handleIgnoreRide}
          onToggleOnline={handleGoOffline}
          isOnline={isOnline}
          onAcceptRide={handleAcceptRide}
        />
      )}
      {/* Component when captain ignore the ride we will show all incoming rides request with Accept and Ignore Button - All Rides in List format */}
      {showRideRequests && (
        <RideRequest
          onBack={handleBackFromRequests}
          onToggleOnline={handleGoOffline}
          isOnline={isOnline}
          onAcceptRide={handleAcceptRide}
        />
      )}

      {/* Component when captain accept the ride  - Accept Detail Component (better naming can be done) and in that component we have a button GoToPickUp as well. Note: THe Button will be seperate component... we will do next..*/}

      {acceptedRide && (
        <AcceptedRideDetails
          rideDetails={acceptedRide}
          onCancel={handleCancelRide}
          onGoToPickup={handleGoToPickup}
        />
      )}

      {/* Pickup Component with Map */}

      {/* Pickup component when capatin scroll up - we will hide the map and show the other detail like pickup at, ETA, DIStance and Fare, Dropoff button and location suggestion */}
    </div>
  );
};

export default CaptainHome;
