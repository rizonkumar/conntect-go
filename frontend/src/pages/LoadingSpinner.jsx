import { useNavigate } from "react-router-dom";

export const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

export const ErrorState = ({ error }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Go to Welcome
        </button>
      </div>
    </div>
  );
};
