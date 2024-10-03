import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavbarLinks } from "../Constants/Constants";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Globe, Menu, X } from "lucide-react";

const Navbar = ({ isLoggedIn, loginData }) => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".nav-link",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      );

      tl.from(
        ".auth-buttons, .user-info",
        {
          opacity: 0,
          x: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: navbarRef }
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav ref={navbarRef} className="bg-white fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold text-red-600">
          <span className="">Connect NGO</span>
        </NavLink>
        <div className="hidden md:flex space-x-4 items-center">
          {NavbarLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `nav-link text-xl font-bold ${
                  isActive ? "text-red-600" : "text-gray-800 hover:text-red-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/geolocation" className="button">
            <Globe />
          </NavLink>
        </div>
        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="user-info text-xl font-bold text-red-600">
              Welcome {loginData.username}
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink
                to="/login"
                className="text-red-500 text-xl font-bold py-2 px-4 rounded mr-2"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-red-500 text-xl hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-red-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            {NavbarLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link text-xl font-bold ${
                    isActive
                      ? "text-red-600"
                      : "text-gray-800 hover:text-red-600"
                  }`
                }
                onClick={toggleMenu}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink to="/geolocation" className="button" onClick={toggleMenu}>
              <Globe />
            </NavLink>
            {isLoggedIn ? (
              <div className="user-info text-xl font-bold text-red-600">
                Welcome {loginData.username}
              </div>
            ) : (
              <div className="auth-buttons flex flex-col space-y-2">
                <NavLink
                  to="/login"
                  className="text-red-500 text-xl font-bold py-2 px-4 rounded text-center"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-red-500 text-xl hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
