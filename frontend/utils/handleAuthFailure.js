export const handleAuthFailure = async (statusCode) => {
  if (statusCode === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = process.env.VITE_BASE_URL;
  }
};
