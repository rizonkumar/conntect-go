import generalApi from "./generalApi";

export const getUserProfile = () => {
  return generalApi.GeneralApi.get("  ");
};

export const getRideHistory = () => {
  return generalApi.GeneralApi.get("/api/users/rides");
};
