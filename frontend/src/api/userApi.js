import generalApi from "./generalApi";

export const getUserProfile = () => {
  return generalApi.GeneralApi.get("/api/users/profile");
};

export const getRideHistory = () => {
  return generalApi.GeneralApi.get("/api/rides/user/rides");
};
