import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Token", token);
  if (!token) {
    navigate("/login");
  }

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
