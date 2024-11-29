import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
