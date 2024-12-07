import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, User, AlertCircle } from "lucide-react";
import { CaptainDataContext } from "../context/CaptainContext";
import { captainLogin } from "../api/authApi";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await captainLogin({
        email: email.trim(),
        password,
      });

      if (response.data) {
        const { data } = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captainToken", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome Captain
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

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
              required
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
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
            }`}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
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

          {/* User Login */}
          <Link
            to="/login"
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            Sign in as User
          </Link>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Want to be a captain?{" "}
              <Link
                to="/captain-signup"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainLogin;
