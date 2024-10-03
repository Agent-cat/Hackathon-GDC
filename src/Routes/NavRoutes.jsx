import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Donate from "../Components/Donate";
import About from "../Components/About";
import Contact from "../Components/Contact";
import ProtectedRoutes from "../Utils/ProtectedRoutes";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import RegisterNgo from "../Components/RegisterNgo";
import GeoLocation from "../Components/GeoLocation";
const NavRoutes = ({ isLoggedIn, setIsLoggedIn, setLoginData }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/donate" element={<Donate />} />
        <Route path="/register-ngo" element={<RegisterNgo />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
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
