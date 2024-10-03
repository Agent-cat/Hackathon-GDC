import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Components/Home";
import Donate from "../Components/Donate";
import About from "../Components/About";
import Contact from "../Components/Contact";
import ProtectedRoutes from "../Utils/ProtectedRoutes";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import RegisterNgo from "../Components/RegisterNgo";
import GeoLocation from "../Components/GeoLocation";
import HandleNgo from "../Components/HandleNgo";

const NavRoutes = ({ isLoggedIn, setIsLoggedIn, setLoginData, loginData }) => {
  const userRole = loginData ? loginData.role : null;

  const checkAccess = (allowedRoles) => {
    return allowedRoles.includes(userRole);
  };

  return (
    <Routes>
      <Route path="/" element={<Home loginData={loginData} />} />
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route
          path="/donate"
          element={
            checkAccess(["user", "donor", "volunteer", "admin"]) ? (
              <Donate />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register-ngo"
          element={
            checkAccess(["admin", "ngo"]) ? (
              <RegisterNgo />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/handle-ngo"
          element={
            checkAccess(["admin"]) ? <HandleNgo /> : <Navigate to="/" replace />
          }
        />
      </Route>
      <Route
        path="/about"
        element={
          checkAccess(["ngo", "admin", "user", "volunteer", "donor"]) ? (
            <About />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/contact"
        element={
          checkAccess(["ngo", "admin", "user", "volunteer", "donor"]) ? (
            <Contact />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          <Login setLoginData={setLoginData} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/geolocation" element={<GeoLocation />} />
    </Routes>
  );
};

export default NavRoutes;
