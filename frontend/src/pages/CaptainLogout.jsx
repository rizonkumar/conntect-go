import { useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = ({ onLogoutSuccess }) => {
  const navigate = useNavigate();
  const { setCaptain, setError } = useContext(CaptainDataContext);

  const handleLogout = useCallback(async () => {
    try {
      await logout("captain");
      setCaptain(null);
      setError(null);
      localStorage.removeItem("captainToken");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      // Move navigation to after state updates
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);
    } catch (error) {
      console.error("Logout failed:", error);
      setCaptain(null);
      setError(null);
      localStorage.removeItem("captainToken");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);
    }
  }, [navigate, setCaptain, setError, onLogoutSuccess]);

  useEffect(() => {
    let mounted = true;

    const performLogout = async () => {
      if (mounted) {
        await handleLogout();
      }
    };

    performLogout();

    return () => {
      mounted = false;
    };
  }, [handleLogout]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
