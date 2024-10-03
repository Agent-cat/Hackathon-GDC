import React from "react";
import Lenis from "lenis";
import Navbar from "./Components/Navbar";
import NavRoutes from "./Routes/NavRoutes";
import { useState } from "react";
const App = () => {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} loginData={loginData} />
      <NavRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setLoginData={setLoginData}
      />
    </div>
  );
};

export default App;
