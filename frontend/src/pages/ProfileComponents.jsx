import React from "react";
import { User, Shield, Clock, Star, MapPin } from "lucide-react";

export const ProfileHeader = ({ name, type, email }) => (
  <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-8 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-pattern opacity-10"></div>
    <div className="relative z-10">
      <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
        <User className="h-12 w-12 text-blue-600" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white">
        <Shield className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">{type}</span>
      </div>
    </div>
  </div>
);

export const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <div className="p-2 bg-white rounded-full shadow-sm">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

export const EmptyRideHistory = ({ isCaptain, onAction }) => (
  <div className="text-center py-16 px-6">
    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Clock className="h-10 w-10 text-gray-400" />
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-3">
      No {isCaptain ? "Trips" : "Rides"} Yet
    </h4>
    <p className="text-gray-600 max-w-md mx-auto mb-8">
      {isCaptain
        ? "Start accepting ride requests to build your trip history and earn more."
        : "Your ride history will appear here once you take your first trip."}
    </p>
    <button
      onClick={onAction}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      {isCaptain ? "Go to Dashboard" : "Book Your First Ride"}
    </button>
  </div>
);

export const RideHistoryCard = ({ ride }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-2" />
        {new Date(ride.createdAt).toLocaleString()}
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          ride.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {ride.status}
      </span>
    </div>

    <div className="space-y-3">
      <div className="flex items-start">
        <div className="min-w-[24px] mr-3">
          <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">From</p>
          <p className="font-medium">{ride.pickup || ride.from}</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="min-w-[24px] mr-3">
          <MapPin className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">To</p>
          <p className="font-medium">{ride.destination || ride.to}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-400 mr-1" />
        <span className="text-sm font-medium">
          {ride.rating || "Not rated"}
        </span>
      </div>
      <div className="text-lg font-bold text-gray-900">
        ₹{(ride.fare || ride.amount).toFixed(2)}
      </div>
    </div>
  </div>
);
