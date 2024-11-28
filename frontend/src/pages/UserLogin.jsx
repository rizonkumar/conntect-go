import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Car } from "lucide-react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Black Header Bar with Logo */}
      <div className="bg-black w-full p-4">
        <div className="max-w-md mx-auto">
          <span className="text-white text-xl font-bold">
            Connect<span className="text-blue-500">Go</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pt-8 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
              placeholder="name@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Captain Login */}
          <Link
            to="/captain-login"
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Car className="w-5 h-5 mr-2" />
            Sign in as Captain
          </Link>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
