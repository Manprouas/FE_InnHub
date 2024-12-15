import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../connection";

const BookingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [dropdownStates, setDropdownStates] = useState({}); // State untuk dropdown

  // Fetch data orders dari API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        setOrders(response.data.data); // Ambil properti data dari respons
      } catch (error) {
        console.error(
          "Error fetching booking history:",
          error.response?.data || error.message
        );
      }
    };
    fetchOrders();
  }, []);

  // Handle edit modal
  const handleEdit = (orderId) => {
    const orderToEdit = orders.find((order) => order._id === orderId);
    setEditingOrder(orderToEdit);
    setEditForm({ ...orderToEdit });
    closeAllDropdowns(); // Tutup dropdown
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${editingOrder._id}`,
        editForm
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === editingOrder._id ? response.data : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      console.error(
        "Error updating order:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      closeAllDropdowns(); // Tutup dropdown
    } catch (error) {
      console.error(
        "Error deleting order:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Dropdown handling
  const toggleDropdown = (orderId) => {
    setDropdownStates((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const closeAllDropdowns = () => setDropdownStates({});

  useEffect(() => {
    const handleClickOutside = () => closeAllDropdowns();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto p-6 font-Inter">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Booking History
      </h1>
      <div className="rounded-lg overflow-visible">
        {/* Header */}
        <div className="grid grid-cols-8 gap-4 text-sm text-white px-6 py-3">
          <div className="text-center">Check-in</div>
          <div className="text-center">Check-out</div>
          <div className="text-center">Total Price</div>
          <div className="text-center">User Email</div>
          <div className="text-center">Room Type</div>
          <div className="text-center">Room Price</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-8 gap-4 bg-white rounded-md items-center text-sm px-6 py-2 hover:shadow-glowing transition-shadow duration-300 relative"
              >
                <div className="text-center">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(order.checkin))}
                </div>
                <div className="text-center">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(order.checkout))}
                </div>
                <div className="text-center">
                  {order.price_total
                    ? `Rp ${order.price_total.toLocaleString("id-ID")}`
                    : "N/A"}
                </div>
                <div className="truncate text-center">
                  {order.userID?.email || "-"}
                </div>
                <div className="truncate text-center">
                  {order.roomID?.roomtype || "-"}
                </div>
                <div className="text-center">
                  {order.roomID?.price
                    ? `Rp ${order.roomID.price.toLocaleString("id-ID")}`
                    : "N/A"}
                </div>
                <div className="relative text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(order._id);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &#x22EE;
                  </button>
                  {dropdownStates[order._id] && (
                    <div
                      className="absolute top-full right-0 bg-white shadow-xl rounded-md text-sm text-gray-700 w-32 z-[9999] mt-2 ring-1 ring-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleEdit(order._id)}
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white py-4">
              No booking history available.
            </div>
          )}
        </div>
      </div>

      {/* Modal Edit */}
      {editingOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[10000]">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkin"
                  value={editForm.checkin?.split("T")[0]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkout"
                  value={editForm.checkout?.split("T")[0]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Price
                </label>
                <input
                  type="number"
                  name="price_total"
                  value={editForm.price_total || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setEditingOrder(null)}
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

export default BookingHistory;
