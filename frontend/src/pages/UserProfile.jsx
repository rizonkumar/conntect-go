import React, { useContext, useEffect, useState } from "react";
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
} from "lucide-react";
import { getUserProfile, getRideHistory } from "../api/userApi";
import { getCaptainProfile } from "../api/captainApi";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rideHistory, setRideHistory] = useState(null);

  // Determine if we should show user or captain profile
  const isCaptain = !!captain;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (isCaptain) {
          const response = await getCaptainProfile();
          if (response.data.success) {
            setCaptain(response.data.data.captain);
          }
        } else {
          const response = await getUserProfile();
          if (response.data.success) {
            setUser(response.data.data.user);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isCaptain, setCaptain, setUser]);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await getRideHistory();
        if (response.data.success) {
          // Ensure we always set an array, even if data is null
          setRideHistory(response.data.data.rideHistory || []);
        } else {
          // If the request fails, set to an empty array
          setRideHistory([]);
        }
      } catch (err) {
        console.error("Error fetching ride history:", err);
        // On error, set to an empty array
        setRideHistory([]);
      }
    };

    fetchRideHistory();
  }, []);

  const profile = captain || user;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-red-500 text-xl font-semibold">{error}</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with back button */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-6">
                <div className="flex justify-center">
                  <div className="bg-white p-2 rounded-full">
                    <User className="h-16 w-16 text-gray-600" />
                  </div>
                </div>
                <h2 className="mt-4 text-center text-white text-xl font-semibold">
                  {profile?.fullName?.firstName} {profile?.fullName?.lastName}
                </h2>
                <p className="text-center text-blue-100">
                  {isCaptain ? "Captain" : "Rider"}
                </p>
              </div>

              <div className="px-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{profile?.email}</span>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">{profile.phone}</span>
                    </div>
                  )}
                  {isCaptain && (
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {captain?.rating || "4.8"} Rating
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ride History */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {isCaptain ? "Trip History" : "Ride History"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your recent {isCaptain ? "trips" : "rides"}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {rideHistory === null ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  ) : rideHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="bg-gray-100 rounded-full p-4 mb-4">
                        <Clock
                          className="h-16 w-16 text-gray-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No {isCaptain ? "Trips" : "Rides"} Yet
                      </h3>
                      <p className="text-gray-500 mb-4 max-w-md">
                        {isCaptain
                          ? "You haven't completed any trips yet. Start accepting ride requests to see your trip history."
                          : "You haven't taken any rides yet. Book your first ride and start exploring!"}
                      </p>
                      <button
                        onClick={() =>
                          navigate(
                            isCaptain ? "/captain-dashboard" : "/book-ride"
                          )
                        }
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center"
                      >
                        {isCaptain ? "Go to Dashboard" : "Book a Ride"}
                        <ArrowLeft className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  ) : (
                    rideHistory.map((ride, index) => (
                      <li key={index} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-500">
                                {ride.date}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-900">
                                {ride.from} → {ride.to}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-sm font-medium text-gray-900">
                              {ride.amount}
                            </p>
                            <div className="flex items-center mt-1">
                              {[...Array(ride.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
