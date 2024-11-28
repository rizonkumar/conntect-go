import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Car, AlertCircle } from "lucide-react";

const CaptainSignup = () => {
  const navigate = useNavigate();

  // Personal information state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vehicle information state
  const [vehicleColor, setVehicleColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [capacity, setCapacity] = useState(4);
  const [vehicleType, setVehicleType] = useState("car");

  // Validation states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    licensePlate: "",
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateLicensePlate = (plate) => {
    const plateRegex = /^[A-Z0-9]{3,8}$/i;
    return plateRegex.test(plate);
  };

  const validateForm = () => {
    const newErrors = {
      firstName: firstName.trim() === "" ? "First name is required" : "",
      lastName: lastName.trim() === "" ? "Last name is required" : "",
      email: !validateEmail(email) ? "Please enter a valid email address" : "",
      password: !validatePassword(password)
        ? "Password must be at least 6 characters long"
        : "",
      vehicleColor:
        vehicleColor.trim() === "" ? "Vehicle color is required" : "",
      licensePlate: !validateLicensePlate(licensePlate)
        ? "Please enter a valid license plate number"
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: API Integration
    const payload = {
      fullName: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      email: email.trim(),
      password,
      vehicle: {
        color: vehicleColor.trim(),
        plate: licensePlate.toUpperCase(),
        capacity: parseInt(capacity),
        vehicleType,
      },
    };

    console.log("Payload:", payload);

    try {
      // TODO: Make API call
      // const response = await axios.post('/api/captains/register', payload);
      // if (response.data.status === "success") {
      //   navigate('/captain-login');
      // }
    } catch (error) {
      // Handle API errors
      console.error("Registration failed:", error);
    }
  };

  // Input component for reusability
  const InputField = ({
    label,
    type,
    value,
    onChange,
    error,
    placeholder,
    required = true,
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Black Header Bar with Logo */}
      <div className="bg-black w-full p-4">
        <div className="max-w-md mx-auto">
          <span
            className="text-white text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Connect<span className="text-blue-500">Go</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pt-8 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Become a Captain
        </h1>
        <p className="text-gray-600 mb-8">
          Register your vehicle and start earning
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>

            {/* Name Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <InputField
                  label="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                  placeholder="First name"
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email & Password */}
            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="email@example.com"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Create a password"
            />
          </div>

          {/* Vehicle Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Vehicle Information
            </h2>

            {/* Vehicle Type & Color */}
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm text-gray-600">
                  Vehicle type <span className="text-red-500">*</span>
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
                  required
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex-1">
                <InputField
                  label="Vehicle color"
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  error={errors.vehicleColor}
                  placeholder="e.g., Black"
                />
              </div>
            </div>

            {/* License Plate & Capacity */}
            <div className="flex gap-4">
              <div className="flex-1">
                <InputField
                  label="License plate"
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  error={errors.licensePlate}
                  placeholder="e.g., ABC123"
                />
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-sm text-gray-600">
                  Seating capacity <span className="text-red-500">*</span>
                </label>
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
                  required
                >
                  <option value="2">2 seats</option>
                  <option value="4">4 seats</option>
                  <option value="6">6 seats</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center mt-8"
          >
            Register as Captain
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Sign in and Sign up Links */}
          <div className="text-center mt-6 space-y-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/captain-login"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
            <p className="text-gray-600">
              Want to register as a user?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
