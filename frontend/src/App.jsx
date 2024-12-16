import { useEffect, useState, useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { verifyToken } from "./api/authApi";
import Welcome from "./pages/Welcome";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./components/Riding";
import Profile from "./pages/Profile";
import { UserDataContext } from "./context/UserContext";
import { CaptainDataContext } from "./context/CaptainContext";

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isCaptainAuthenticated, setIsCaptainAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  const [captain, setCaptain] = useState(null);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(() => {
    // Check user authentication
    const isUserValid = verifyToken("user");
    setIsUserAuthenticated(isUserValid);

    // Check captain authentication
    const isCaptainValid = verifyToken("captain");
    setIsCaptainAuthenticated(isCaptainValid);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e) => {
      if (e.key === "userToken" || e.key === "captainToken") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkAuth]);

  const updateAuthStatus = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Landing page logic
  const LandingPage = () => {
    if (isUserAuthenticated) {
      return <Navigate to="/home" replace />;
    }
    if (isCaptainAuthenticated) {
      return <Navigate to="/captain-home" replace />;
    }
    return <Welcome />;
  };

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <CaptainDataContext.Provider
        value={{ captain, setCaptain, error, setError }}
      >
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Public routes */}
            <Route
              path="/login"
              element={
                !isUserAuthenticated ? (
                  <UserLogin onLoginSuccess={updateAuthStatus} />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isUserAuthenticated ? (
                  <UserSignup onSignupSuccess={updateAuthStatus} />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route
              path="/captain-login"
              element={
                !isCaptainAuthenticated ? (
                  <CaptainLogin onLoginSuccess={updateAuthStatus} />
                ) : (
                  <Navigate to="/captain-home" replace />
                )
              }
            />
            <Route
              path="/captain-signup"
              element={
                !isCaptainAuthenticated ? (
                  <CaptainSignup onSignupSuccess={updateAuthStatus} />
                ) : (
                  <Navigate to="/captain-home" replace />
                )
              }
            />

            {/* Protected user routes */}
            <Route
              path="/home"
              element={
                <UserProtectedWrapper>
                  <Home />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/riding"
              element={
                <UserProtectedWrapper>
                  <Riding />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/user/logout"
              element={
                <UserProtectedWrapper>
                  <UserLogout onLogoutSuccess={updateAuthStatus} />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/user/profile"
              element={
                <UserProtectedWrapper>
                  <Profile />
                </UserProtectedWrapper>
              }
            />

            {/* Protected captain routes */}
            <Route
              path="/captain-home"
              element={
                <CaptainProtectedWrapper>
                  <CaptainHome />
                </CaptainProtectedWrapper>
              }
            />
            <Route
              path="/captain/logout"
              element={
                <CaptainProtectedWrapper>
                  <CaptainLogout onLogoutSuccess={updateAuthStatus} />
                </CaptainProtectedWrapper>
              }
            />
            <Route
              path="/captain/profile"
              element={
                <CaptainProtectedWrapper>
                  <Profile />
                </CaptainProtectedWrapper>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CaptainDataContext.Provider>
    </UserDataContext.Provider>
  );
};

export default App;
