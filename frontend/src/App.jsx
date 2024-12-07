import React, { useEffect, useState } from "react";
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
import UserProfile from "./pages/UserProfile";

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isCaptainAuthenticated, setIsCaptainAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check user authentication
      const isUserValid = verifyToken("user");
      setIsUserAuthenticated(isUserValid);

      // Check captain authentication
      const isCaptainValid = verifyToken("captain");
      setIsCaptainAuthenticated(isCaptainValid);

      setIsLoading(false);
    };

    checkAuth();
  }, []);

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
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route
          path="/login"
          element={
            !isUserAuthenticated ? (
              <UserLogin />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isUserAuthenticated ? (
              <UserSignup />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/captain-login"
          element={
            !isCaptainAuthenticated ? (
              <CaptainLogin />
            ) : (
              <Navigate to="/captain-home" replace />
            )
          }
        />
        <Route
          path="/captain-signup"
          element={
            !isCaptainAuthenticated ? (
              <CaptainSignup />
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
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/profile"
          element={
            <UserProtectedWrapper>
              <UserProfile />
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
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain/profile"
          element={
            <CaptainProtectedWrapper>
              <UserProfile />
            </CaptainProtectedWrapper>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
