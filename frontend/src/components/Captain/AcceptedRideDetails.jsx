import { Phone, MessageSquare, X, MapPin } from "lucide-react";

const AcceptedRideDetails = ({ rideDetails, onCancel, onGoToPickup }) => {
  const {
    pickup = "",
    destination = "",
    fare = 0,
    distance = 0,
    passenger = {},
    notes = "",
    payments = [],
  } = rideDetails || {};

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              passenger.image ||
              "https://api.dicebear.com/7.x/initials/svg?seed=User"
            }
            alt={passenger.name || "Passenger"}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://api.dicebear.com/7.x/initials/svg?seed=User";
            }}
          />
          <div>
            <h2 className="font-medium">{passenger.name || "New Passenger"}</h2>
            {/* Payment method and discount tags */}
            <div className="flex gap-2">
              {passenger.paymentMethod && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                  {passenger.paymentMethod}
                </span>
              )}
              {passenger.hasDiscount && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  Discount Applied
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">₹{fare}</p>
          <p className="text-sm text-gray-500">{distance} km</p>
        </div>
      </div>

      {/* Location Details */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">PICKUP</p>
            <p className="font-medium">{pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-black mt-1" />
          <div>
            <p className="text-sm text-gray-500">DROP-OFF</p>
            <p className="font-medium">{destination}</p>{" "}
            {/* Changed from dropoff.address to destination */}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {notes && (
        <div className="px-4 py-3 bg-gray-50">
          <p className="text-sm">{notes}</p>
        </div>
      )}

      {/* Payment Details */}
      {payments.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            PAYMENT DETAILS
          </h3>
          <div className="space-y-2">
            {payments.map((payment, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{payment.label}</span>
                <span className="font-medium">₹{payment.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button className="flex flex-col items-center gap-1">
            <div className="p-3 bg-gray-100 rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs">Call</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="p-3 bg-gray-100 rounded-full">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs">Message</span>
          </button>
          <button
            onClick={onCancel}
            className="flex flex-col items-center gap-1"
          >
            <div className="p-3 bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </div>
            <span className="text-xs">Cancel</span>
          </button>
        </div>

        <button
          onClick={onGoToPickup}
          className="w-full bg-yellow-400 py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          GO TO PICKUP
        </button>
      </div>
    </div>
  );
};

export default AcceptedRideDetails;
