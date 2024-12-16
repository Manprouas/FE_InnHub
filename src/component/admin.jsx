import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { getProfile, logout } from "../redux/reducers/authslice";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { API_URL } from "../../connection";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(userInfo ? userInfo.username : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [gambarPreview, setGambarPreview] = useState(
    userInfo?.gambar ? `${API_URL}uploads/${userInfo.gambar}` : null
  );

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("token")) {
      dispatch(getProfile());
    }

    if (!isLoggedIn) {
      navigate("/"); // Redirect ke login jika tidak ada token
    }
  }, [isLoggedIn, userInfo, dispatch, navigate]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setGambarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (image) {
        formData.append("gambar", image);
    }

    try {
        const response = await axios.put(
            `${API_URL}/users/profile/update`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log("Profile updated successfully:", response.data);

        // Update gambar preview
        if (response.data.user.gambar) {
            setGambarPreview(`${API_URL}/uploads/${response.data.user.gambar}`);
        }

        dispatch(getProfile()); // Refresh profile data
    } catch (error) {
        console.error("Error updating profile:", error.response?.data || error.message);
    }
};

  return (
    <div className="min-h-screen flex-col items-center pt-8 px-4">
      <div className="container mx-auto max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full mb-4">
            {gambarPreview ? (
              <img
                src={gambarPreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <FaUsers className="h-12 w-12 text-gray-500" />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gambar" className="block text-gray-700">
                Profile Image
              </label>
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
