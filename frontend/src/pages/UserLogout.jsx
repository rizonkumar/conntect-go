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
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
