import { useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { UserDataContext } from "../context/UserContext";

const UserLogout = ({ onLogoutSuccess }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleLogout = useCallback(async () => {
    try {
      await logout("user");
      setUser({
        email: "",
        fullName: {
          firstName: "",
          lastName: "",
        },
      });
      localStorage.removeItem("userToken");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      // Move navigation to after state updates
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);
    } catch (error) {
      console.error("Logout failed:", error);
      setUser({
        email: "",
        fullName: {
          firstName: "",
          lastName: "",
        },
      });
      localStorage.removeItem("userToken");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);
    }
  }, [navigate, setUser, onLogoutSuccess]);

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

export default UserLogout;
