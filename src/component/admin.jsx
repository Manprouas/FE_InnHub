import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { getProfile, logout } from "../redux/reducers/authslice";
import { useNavigate } from "react-router-dom"; // Impor useNavigate untuk redirect

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inisialisasi navigate
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && !userInfo) {
      dispatch(getProfile()); // Dispatch action untuk mengambil profil jika userInfo belum ada
    }

    if (isLoggedIn && userInfo) {
      // Jika sudah login dan profil sudah dimuat, redirect ke Home
      navigate("/home");
    }
  }, [isLoggedIn, userInfo, dispatch, navigate]);

  if (!userInfo) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum tersedia
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Setelah logout, redirect ke halaman login
  };

  return (
    <div className="min-h-screen flex-col items-center pt-8 px-4">
      <div className="container mx-auto max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {/* Icon Section */}
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <FaUsers className="h-12 w-12 text-gray-500" />
          </div>

          {/* Text and Details Section */}
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">Hi, {userInfo.username}!</h1>
            <div className="text-justify">
              <p className="text-gray-700 mb-1">Nama: {userInfo.username}</p>
              <p className="text-gray-700 mb-4">Email: {userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded flex justify-end"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
