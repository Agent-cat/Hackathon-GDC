import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";

const RegisterNgo = () => {
  const [formData, setFormData] = useState({
    NGOName: "",
    NGOAddress: "",
    TotalDonations: 0,
    TotalVolunteers: 0,
    NGOLocation: "",
    NGOOwner: "",
  });

  const formRef = useRef(null);
  const svgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/ngo", formData)
      .then((response) => {
        console.log("NGO registered successfully:", response.data);
        alert("NGO registered successfully");
      })
      .catch((error) => {
        console.error("Error registering NGO:", error);
      });
  };

  useGSAP(
    () => {
      gsap.to(".floating-heart", {
        y: -20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    },
    { scope: svgRef }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="h-full mt-56 w-full"
        >
          <path
            fill="#FFCCCB"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="h-full w-full  mt-56 absolute top-0 left-0"
        >
          <path
            fill="#FFE5E5"
            fillOpacity="0.4"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,186.7C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div ref={svgRef} className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <svg
            key={index}
            className={`floating-heart absolute w-8 h-8 text-red-500 opacity-50`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>
      <div
        ref={formRef}
        className="max-w-md w-full space-y-8 relative z-20 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your NGO
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="NGOName"
                className="block text-sm font-medium text-gray-700"
              >
                NGO Name
              </label>
              <input
                id="NGOName"
                name="NGOName"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="NGO Name"
                value={formData.NGOName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="NGOAddress"
                className="block text-sm font-medium text-gray-700"
              >
                NGO Address
              </label>
              <input
                id="NGOAddress"
                name="NGOAddress"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="NGO Address"
                value={formData.NGOAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="TotalDonations"
                className="block text-sm font-medium text-gray-700"
              >
                Total Donations
              </label>
              <input
                id="TotalDonations"
                name="TotalDonations"
                type="number"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Total Donations"
                value={formData.TotalDonations}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="TotalVolunteers"
                className="block text-sm font-medium text-gray-700"
              >
                Total Volunteers
              </label>
              <input
                id="TotalVolunteers"
                name="TotalVolunteers"
                type="number"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Total Volunteers"
                value={formData.TotalVolunteers}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="NGOLocation"
                className="block text-sm font-medium text-gray-700"
              >
                NGO Location
              </label>
              <input
                id="NGOLocation"
                name="NGOLocation"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="NGO Location"
                value={formData.NGOLocation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="NGOOwner"
                className="block text-sm font-medium text-gray-700"
              >
                NGO Owner
              </label>
              <input
                id="NGOOwner"
                name="NGOOwner"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="NGO Owner"
                value={formData.NGOOwner}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register NGO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterNgo;
