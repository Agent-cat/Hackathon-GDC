import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: "",
    role: "donor",
  });

  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response.data);
    }
  };

  return (
    <div className="flex items-center  mt-10 justify-center min-h-screen bg-gray-100">
      <div
        ref={formRef}
        className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
              maxLength="20"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
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
              minLength="6"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture URL
            </label>
            <input
              id="profilePicture"
              type="file"
              name="profilePicture"
              placeholder="Enter profile picture URL"
              value={formData.profilePicture}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
              <option value="volunteer">Volunteer</option>
              <option value="receiver">Receiver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        <h1 className="text-center">
          Already have an account?{" "}
          <Link className="text-red-600" to="/login">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
