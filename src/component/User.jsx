import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../connection";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [file, setFile] = useState(null); // Untuk menyimpan file gambar

  // Fetch data user dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers`);
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };
    fetchUsers();
  }, []);

  const toggleDropdown = (userId) => {
    setDropdownStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const closeAllDropdowns = () => setDropdownStates({});

  useEffect(() => {
    const handleClickOutside = () => closeAllDropdowns();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditingUser(userToEdit);
    setEditForm({ ...userToEdit });
    setFile(null); // Reset file setiap kali membuka modal
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editForm.username);
      formData.append("email", editForm.email);
      formData.append("phone", editForm.phone);
      if (file) {
        formData.append("gambar", file); // Tambahkan file jika ada
      }

      const response = await axios.put(
        `${API_URL}/customers/${editingUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? response.data : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Simpan file gambar
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/customers/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  const filteredUsers = users.filter((user) => !user.is_admin);

  return (
    <div className="container mx-auto p-6 font-Inter">
      <h1 className="text-2xl font-semibold text-white mb-6">User List</h1>
      <div className="rounded-lg overflow-visible">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 text-sm text-white px-6 py-3">
          <div className="text-center">Profile</div>
          <div className="text-center">Username</div>
          <div className="text-center">Email</div>
          <div className="text-center">Phone</div>
          <div className="text-center">Status</div>
          <div className="text-center">Date Registered</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-7 gap-4 bg-white rounded-md items-center text-sm px-6 py-2 hover:shadow-glowing transition-shadow duration-300 relative"
            >
              <div className="flex justify-center">
                <img
                  src={
                    user.gambar
                      ? `${API_URL}/uploads/${user.gambar}`
                      : "/default-profile.png"
                  }
                  alt={`${user.username} profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="truncate text-center">{user.username}</div>
              <div className="truncate text-center">{user.email}</div>
              <div className="truncate text-center">{user.phone || "N/A"}</div>
              <div className="text-center">
                <span
                  className={`px-8 py-1 text-xs font-semibold rounded-full ${
                    user.is_admin
                      ? "bg-green-200 text-green-800"
                      : "bg-purple-200 text-purple-800"
                  }`}
                >
                  {user.is_admin ? "Admin" : "User"}
                </span>
              </div>
              <div className="text-center">
                {new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(user.date))}
              </div>

              <div className="relative text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(user._id);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &#x22EE;
                </button>
                {dropdownStates[user._id] && (
                  <div
                    className="absolute top-full right-0 bg-white shadow-xl rounded-md text-sm text-gray-700 w-32 z-[9999] mt-2 ring-1 ring-gray-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="block w-full px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[10000]">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
