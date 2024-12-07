import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

export const CaptainLogout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout('captain');
        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/captain-login");
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
