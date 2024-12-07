import { jwtDecode } from "jwt-decode";
import generalApi from "./generalApi";

// User Login
export const userLogin = (data) => {
  const url = `/users/login`;
  return generalApi.GeneralApi.post(url, data);
};

// Captain Login
export const captainLogin = (data) => {
  const url = `/captains/login`;
  return generalApi.GeneralApi.post(url, data);
};

// Get access token based on user type
export const getAccessToken = (userType = "user") => {
  return userType === "captain"
    ? localStorage.getItem("captainToken")
    : localStorage.getItem("userToken");
};

// Decode JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Verify if token is valid
export const verifyToken = (userType = "user") => {
  const token = getAccessToken(userType);
  if (!token) return false;

  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Refresh token
export const refreshToken = (userType = "user") => {
  const url = userType === "captain" ? `/captains/refresh` : `/users/refresh`;
  return generalApi.GeneralApi.post(url);
};

// Logout
export const logout = (userType = "user") => {
  const url = userType === "captain" ? `/captains/logout` : `/users/logout`;
  return generalApi.GeneralApi.post(url);
};
