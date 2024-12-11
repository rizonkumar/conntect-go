import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

export const CaptainLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout("captain");
      if (response.status === 200) {
        localStorage.removeItem("captainToken");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
