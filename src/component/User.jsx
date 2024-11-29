import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../connection";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers`);
        setUsers(response.data);
        console.log("Fetched Users:", response.data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => !user.is_admin);

  return (
    <div className="container mx-auto p-6 font-Inter">
      <h1 className="text-2xl font-bold mb-6">User List</h1>
      <div className="rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-gray-700 px-6 py-3">
          <div className="text-center">Profile</div>
          <div className="text-center">Username</div>
          <div className="text-center">Email</div>
          <div className="text-center">Phone</div>
          <div className="text-center">Status</div>
          <div className="text-center">Date Registered</div>
        </div>
        {/* Body */}
        <div className="divide-y space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-6 gap-4 items-center text-sm border text-gray-800 px-6 py-4 shadow-lg shadow-blue-400/50 hover:bg-gray-50"
            >
              <div className="flex justify-center">
                <img
                  src={
                    user.gambar
                      ? `${API_URL}/uploads/${user.gambar}`
                      : "/default-profile.png"
                  }
                  alt={`${user.username} profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="truncate text-center">{user.username}</div>
              <div className="truncate text-center">{user.email}</div>
              <div className="truncate text-center">{user.phone || "N/A"}</div>
              <div className="text-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.is_admin
                      ? "bg-green-200 text-green-800"
                      : "bg-purple-200 text-purple-800"
                  }`}
                >
                  {user.is_admin ? "Admin" : "User"}
                </span>
              </div>
              <div className="text-center">
                {new Date(user.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
