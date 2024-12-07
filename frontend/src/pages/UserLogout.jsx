import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

const UserLogout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout('user');
        localStorage.removeItem("userToken");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/login");
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
