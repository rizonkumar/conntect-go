import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Power } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { logout } from "../api/authApi";

const ProfileDropdown = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const profileData = userType === "captain" ? captain : user;

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
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout(userType);

      if (userType === "user") {
        setUser({
          email: "",
          fullName: {
            firstName: "",
            lastName: "",
          },
        });
        localStorage.removeItem("userToken");
      } else if (userType === "captain") {
        setCaptain(null);
        localStorage.removeItem("captainToken");
      }

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      if (userType === "user") {
        setUser({
          email: "",
          fullName: {
            firstName: "",
            lastName: "",
          },
        });
        localStorage.removeItem("userToken");
      } else if (userType === "captain") {
        setCaptain(null);
        localStorage.removeItem("captainToken");
      }
      navigate("/");
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  const getInitials = (fullName) => {
    if (!fullName || !fullName.firstName || !fullName.lastName) return "??";
    return `${fullName.firstName[0]}${fullName.lastName[0]}`.toUpperCase();
  };

  const handleProfileClick = () => {
    navigate(`/${userType}/profile`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Profile menu"
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
              onClick={handleProfileClick}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <User className="mr-3 h-5 w-5 text-gray-500" />
              Profile
            </li>
            <li
              onClick={handleLogout}
              className={`flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer ${
                isLoggingOut ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Power className="mr-3 h-5 w-5" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
