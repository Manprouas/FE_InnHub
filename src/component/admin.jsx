import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { getProfile, logout } from "../redux/reducers/authslice";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(userInfo ? userInfo.username : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");

  useEffect(() => {
    if (isLoggedIn && !userInfo) {
      dispatch(getProfile());
    }

    if (isLoggedIn && userInfo) {
      navigate("/home");
    }
  }, [isLoggedIn, userInfo, dispatch, navigate]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  // Handle file change for image upload
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission for updating the profile
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (image) formData.append("gambar", image);

    try {
      const response = await axios.put(
        `http://localhost:3000/customers/${userInfo.id}`, // Use userInfo._id for correct user ID
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile updated:", response.data);
      // Optionally update the state with the response
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex-col items-center pt-8 px-4">
      <div className="container mx-auto max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <FaUsers className="h-12 w-12 text-gray-500" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">Hi, {userInfo.username}!</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gambar" className="block text-gray-700">Profile Image</label>
                <input
                  type="file"
                  id="gambar"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 rounded border"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
