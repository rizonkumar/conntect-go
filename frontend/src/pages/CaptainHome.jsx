import React, { useState } from "react";
import InactiveStatus from "../components/Captain/InactiveStatus";
import { captainStats, rideDetails } from "../../constants/data";
import ActiveStatus from "../components/Captain/ActiveStatus";
import RideRequest from "../components/Captain/RideRequest";
import AcceptedRideDetails from "../components/Captain/AcceptedRideDetails";
import PickupContainer from "../components/Captain/PickupContainer";
import ProfileDropdown from "../components/ProfileDropdown";

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
    setAcceptedRide(null);
    setShowPickup(false);
  };

  return (
    <div>
      {!isOnline ? (
        <InactiveStatus 
          {...captainStats} 
          onGoOnline={handleGoOnline} 
          headerRight={
            <ProfileDropdown userType="captain" />
          }
        />
      ) : (
        <>
          {/* Header for online status */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium">Online</span>
            </div>
            <ProfileDropdown userType="captain" />
          </div>

          {/* Rest of the components */}
          {!showRideRequests && !acceptedRide && !showPickup && (
            <ActiveStatus
              onIgnore={handleIgnoreRide}
              onToggleOnline={handleGoOffline}
              isOnline={isOnline}
              onAcceptRide={handleAcceptRide}
            />
          )}
          
          {showRideRequests && (
            <RideRequest
              onBack={handleBackFromRequests}
              onToggleOnline={handleGoOffline}
              isOnline={isOnline}
              onAcceptRide={handleAcceptRide}
            />
          )}

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
        </>
      )}
    </div>
  );
};

export default CaptainHome;
