import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Car } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { userRegister } from "../api/authApi";

const UserSignup = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: {
          firstName,
          lastName,
        },
        email,
        password,
      };

      const response = await userRegister(payload);
      if (response.data) {
        const { data } = response.data;
        setUser(data.user);
        localStorage.setItem("userToken", data.token);
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError("Error Message", errorMessage);
      console.error("Registration failed:", error);
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
          Create your account
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name Fields Group */}
          <div className="flex gap-4">
            {/* First Name Input */}
            <div className="space-y-2 flex-1">
              <label className="text-sm text-gray-600">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
                placeholder="John"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="space-y-2 flex-1">
              <label className="text-sm text-gray-600">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
                placeholder="Doe"
                required
              />
            </div>
          </div>

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
            <label className="text-sm text-gray-600">Create password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
          >
            Create Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Captain Signup Link */}
          <Link
            to="/captain-signup"
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Car className="w-5 h-5 mr-2" />
            Sign up as Captain
          </Link>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
