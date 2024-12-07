import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/authApi";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isValid = verifyToken("captain");
      if (!isValid) {
        navigate("/captain-login");
      }
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
