import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import {
  User,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  Star,
  Clock,
  Car,
  DollarSign,
  ChevronLeft,
} from "lucide-react";
import { getUserProfile, getRideHistory } from "../api/userApi";
import { getCaptainProfile, getCaptainRideHistory } from "../api/captainApi";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rideHistory, setRideHistory] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Determine profile type based on context
  const isUserProfile = !!user;
  const isCaptainProfile = !!captain;

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isCaptainProfile) {
        const [profileResponse, rideHistoryResponse] = await Promise.all([
          getCaptainProfile(),
          getCaptainRideHistory(),
        ]);

        if (profileResponse.data.success) {
          setCaptain(profileResponse.data.data.captain);
        }

        if (rideHistoryResponse.data.success) {
          const { totalRides, totalEarnings, rides } =
            rideHistoryResponse.data.data;
          setRideHistory(rides);
          setTotalEarnings(totalEarnings);
        }
      } else if (isUserProfile) {
        const [profileResponse, rideHistoryResponse] = await Promise.all([
          getUserProfile(),
          getRideHistory(),
        ]);

        if (profileResponse.data.success) {
          setUser(profileResponse.data.data.user);
        }

        if (rideHistoryResponse.data.success) {
          setRideHistory(rideHistoryResponse.data.data.rideHistory);
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, [isCaptainProfile, isUserProfile, setCaptain, setUser]);

  useEffect(() => {
    // Only fetch data if we have a user or captain
    if (isUserProfile || isCaptainProfile) {
      fetchProfileData();
    } else {
      // If no user or captain, redirect to login
      navigate("/welcome");
    }
  }, [isUserProfile, isCaptainProfile, fetchProfileData, navigate]);

  // Handle logout scenario
  useEffect(() => {
    if (!isUserProfile && !isCaptainProfile) {
      navigate("/welcome");
    }
  }, [isUserProfile, isCaptainProfile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate("/welcome")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Go to Welcome
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() =>
                navigate(isCaptainProfile ? "/captain-dashboard" : "/dashboard")
              }
              className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">
                {isCaptainProfile ? "Captain Dashboard" : "Dashboard"}
              </span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {isCaptainProfile ? "Captain Profile" : "User Profile"}
            </h1>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-center">
                <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <span className="text-4xl font-bold text-blue-600">
                    {isCaptainProfile
                      ? `${captain.fullName.firstName[0]}${captain.fullName.lastName[0]}`
                      : `${user.fullName.firstName[0]}${user.fullName.lastName[0]}`}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isCaptainProfile
                    ? `${captain.fullName.firstName} ${captain.fullName.lastName}`
                    : `${user.fullName.firstName} ${user.fullName.lastName}`}
                </h2>
                <p className="text-blue-100">
                  {isCaptainProfile ? "Captain" : "Passenger"}
                </p>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {isCaptainProfile ? captain.email : user.email}
                  </span>
                </div>

                {isCaptainProfile && (
                  <>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                        {captain.vehicle.color} {captain.vehicle.vehicleType}-{" "}
                        {captain.vehicle.plate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700 font-semibold">
                        Total Earnings: ₹{totalEarnings.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Ride History */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCaptainProfile ? "Ride History" : "Past Rides"}
                </h3>
              </div>

              {!rideHistory || rideHistory.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    No {isCaptainProfile ? "Trips" : "Rides"} Yet
                  </h4>
                  <p className="text-gray-500 mb-6">
                    {isCaptainProfile
                      ? "You haven't completed any trips yet. Start accepting ride requests to see your trip history."
                      : "You haven't taken any rides yet. Book your first ride and start exploring!"}
                  </p>
                  <button
                    onClick={() =>
                      navigate(
                        isCaptainProfile ? "/captain-dashboard" : "/book-ride"
                      )
                    }
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    {isCaptainProfile ? "Go to Dashboard" : "Book a Ride"}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {rideHistory.map((ride, index) => (
                    <div
                      key={index}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm text-gray-500">
                              {new Date(ride.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm text-gray-900 font-medium">
                              {ride.pickup || ride.from} →{" "}
                              {ride.destination || ride.to}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            ₹{(ride.fare || ride.amount).toFixed(2)}
                          </p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ride.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {ride.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
