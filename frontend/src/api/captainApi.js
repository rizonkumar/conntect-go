import generalApi from "./generalApi";

// get location suggestions
export const getLocationSuggestions = (input) => {
  const url = `/maps/get-suggestions?input=${input}`;
  return generalApi.GeneralApi.get(url);
};

// get captain profile
export const getCaptainProfile = () => {
  return generalApi.GeneralApi.get("/api/captains/profile");
};
