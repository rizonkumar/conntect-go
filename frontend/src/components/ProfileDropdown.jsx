import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Power } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { logout } from "../api/authApi";

const ProfileDropdown = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const profileData = userType === "captain" ? captain : user;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout(userType);
      if (userType === "user") {
        setUser(null);
      } else if (userType === "captain") {
        setCaptain(null);
      }
      navigate("/welcome");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getInitials = (fullName) => {
    if (!fullName || !fullName.firstName || !fullName.lastName) return "??";
    return `${fullName.firstName[0]}${fullName.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {getInitials(profileData?.fullName)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-200 text-center">
            <p className="text-sm font-medium text-gray-900 truncate">
              {profileData?.fullName?.firstName}{" "}
              {profileData?.fullName?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {profileData?.email}
            </p>
          </div>
          <ul className="py-1">
            <li
              onClick={() => {
                navigate(`/${userType}/profile`);
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <User className="mr-3 h-5 w-5 text-gray-500" /> Profile
            </li>
            <li
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              <Power className="mr-3 h-5 w-5" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
