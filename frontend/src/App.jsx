import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { verifyToken, getAccessToken } from "./api/authApi";
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

  useEffect(() => {
    const checkAuth = () => {
      // Check user authentication
      const token = getAccessToken();
      const isUserValid = verifyToken(token, 'user');
      setIsUserAuthenticated(isUserValid);

      // Check captain authentication
      const isCaptainValid = verifyToken(token, 'captain');
      setIsCaptainAuthenticated(isCaptainValid);
    };

    checkAuth();
  }, []);

  console.log("User Authenticated:", isUserAuthenticated);
  console.log("Captain Authenticated:", isCaptainAuthenticated);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
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
          path="/user/profile"
          element={
            <UserProtectedWrapper>
              <UserProfile />
            </UserProtectedWrapper>
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
      </Routes>
    </div>
  );
};

export default App;
