import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
  const token = localStorage.getItem("captainToken");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      }
    });

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;