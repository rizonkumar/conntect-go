import React, { useState } from "react";
import InactiveStatus from "../components/Captain/InactiveStatus";
import { captainStats, rideDetails } from "../../constants/data";
import ActiveStatus from "../components/Captain/ActiveStatus";
import RideRequest from "../components/Captain/RideRequest";
import AcceptedRideDetails from "../components/Captain/AcceptedRideDetails";
import PickupContainer from "../components/Captain/PickupContainer";

const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showRideRequests, setShowRideRequests] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [showPickup, setShowPickup] = useState(false);

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
    setShowPickup(false);
  };

  const handleGoToPickup = () => {
    setShowPickup(true);
  };

  const handleFindNewRides = () => {
    setIsOnline(false);
    setShowRideOptions(false);
    setAcceptedRide(null);
    setShowPickup(false);
  };

  return (
    <div>
      {/* Component for When Captain Status is inactive */}
      {!isOnline && (
        <InactiveStatus {...captainStats} onGoOnline={handleGoOnline} />
      )}
      {/* Component for When Captain Status is active with Accept and Ignore Rides */}
      {isOnline && !showRideRequests && !acceptedRide && !showPickup && (
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

      {acceptedRide && !showPickup && (
        <AcceptedRideDetails
          rideDetails={acceptedRide}
          onCancel={handleCancelRide}
          onGoToPickup={handleGoToPickup}
        />
      )}

      {showPickup && acceptedRide && (
        <PickupContainer
          pickup={acceptedRide.pickup}
          onBack={() => setShowPickup(false)}
          onFindNewRides={handleFindNewRides}
        />
      )}
    </div>
  );
};

export default CaptainHome;
