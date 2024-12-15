import { useState, useRef } from "react";

const RideConfirmationCaptain = ({
  passenger,
  pickup,
  dropoff,
  fare,
  distance,
  onConfirm,
  onCancel,
  expectedOTP,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP === expectedOTP) {
      onConfirm();
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs[0].current.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={passenger.image}
              alt={passenger.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-medium">{passenger.name}</h2>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                  ApplePay
                </span>
                {passenger.hasDiscount && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded">
                    Discount
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">${fare}</p>
            <p className="text-sm text-gray-500">{distance} km</p>
          </div>
        </div>
      </div>

      {/* OTP Section */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-medium mb-2">Enter Ride PIN</h3>
        <p className="text-gray-500 mb-6">
          Ask passenger for their 4-digit PIN
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>

      {/* Location Details */}
      <div className="p-4 bg-gray-50">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">PICKUP</p>
            <p className="font-medium">{pickup}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">DROP-OFF</p>
            <p className="font-medium">{dropoff}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3">
        <button
          onClick={handleVerifyOTP}
          className="w-full bg-black text-white py-4 rounded-lg font-medium"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RideConfirmationCaptain;
