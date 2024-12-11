import generalApi from "./generalApi";

export const getUserProfile = () => {
  return generalApi.GeneralApi.get("/api/users/profile");
};

export const getRideHistory = () => {
  return generalApi.GeneralApi.get("/api/rides/user/rides");
};

export const getFares = async (pickup, dropoff) => {
  return generalApi.GeneralApi.get("/api/rides/fare", {
    params: {
      pickup,
      destination: dropoff,
    },
  });
};

export const getETA = async (pickup, dropoff) => {
  return generalApi.GeneralApi.get("/api/rides/eta", {
    params: {
      pickup,
      destination: dropoff,
    },
  });
};
