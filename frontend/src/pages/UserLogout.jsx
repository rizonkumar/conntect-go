import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

const UserLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout("user");
      localStorage.removeItem("userToken");
      navigate("/", { replace: true });
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

export default UserLogout;
