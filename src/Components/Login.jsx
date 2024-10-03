import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = ({ setIsLoggedIn, setLoginData }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      console.log("Login successful:", response.data);
      setIsLoggedIn(true);
      setLoginData(response.data);
      navigate("/donate");
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center min-h-screen bg-gray-100">
      <div
        ref={formRef}
        className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <h1 className="text-center">
          Don't have an account?{" "}
          <Link className="text-red-600" to="/signup">
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
