import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "https://newblogprojectbackend.onrender.com";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${URL}/api/admin`);
      const adminData = response.data;

      const matchedAdmin = adminData.find(
        (admin) => admin.username === username && admin.password === password
      );

      if (matchedAdmin) {
        console.log("Authentication successful");
        setMessage("Authentication successful!");
        localStorage.setItem("isAdminAuthenticated", "true");
        navigate("/addpost");
      } else {
        console.log("Authentication failed");
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage("Error occurred during authentication.");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>

        {message && (
          <div className="text-center mt-4 text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
