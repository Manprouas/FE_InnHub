import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../connection";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({
    checkin: "",
    checkout: "",
    price_total: "",
  });

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        const transformedData = response.data.data.map((order) => ({
          _id: order._id,
          checkin: order.checkin,
          checkout: order.checkout,
          price_total: order.price_total,
          user_email: order.userID?.email || "Unknown",
          roomID: order.roomID?._id.slice(0, 4) || "N/A", // 4 digit pertama
          room_type: order.roomID?.roomtype || "Unknown",
        }));
        setOrders(transformedData);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data || error.message
        );
      }
    };
    fetchOrders();
  }, []);

  const toggleDropdown = (orderId) => {
    setDropdownStates((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const closeAllDropdowns = () => setDropdownStates({});

  const openModal = (order) => {
    setCurrentOrder(order);
    setFormData({
      checkin: order.checkin,
      checkout: order.checkout,
      price_total: order.price_total,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentOrder(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOrder) {
        // Update order
        await axios.put(`${API_URL}/orders/${currentOrder._id}`, formData);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === currentOrder._id ? { ...order, ...formData } : order
          )
        );
      } else {
        // Create new order
        const response = await axios.post(`${API_URL}/orders`, formData);
        setOrders((prevOrders) => [...prevOrders, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving order:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => closeAllDropdowns();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto p-6 font-Inter">
      <h1 className="text-2xl font-semibold text-white mb-6">Order List</h1>
      <div className="rounded-lg overflow-visible">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 text-sm text-white px-6 py-3">
          <div className="text-center">Check-In</div>
          <div className="text-center">Check-Out</div>
          <div className="text-center">Price Total</div>
          <div className="text-center">User Email</div>
          <div className="text-center">Room</div>
          <div className="text-center">Action</div>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-6 gap-4 bg-white rounded-md items-center text-sm px-6 py-2 hover:shadow-glowing transition-shadow duration-300 relative"
            >
              <div className="truncate text-center">{formatDate(order.checkin)}</div>
              <div className="truncate text-center">{formatDate(order.checkout)}</div>
              <div className="truncate text-center">Rp {order.price_total}</div>
              <div className="truncate text-center">{order.user_email}</div>
              <div className="truncate text-center">{order.roomID}</div>
              <div className="relative text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(order._id);
                  }}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  &#8942; {/* Unicode for vertical ellipsis */}
                </button>
                {dropdownStates[order._id] && (
                  <div className="absolute z-10 bg-gray-100 border rounded p-3 mt-1 shadow-lg right-0">
                    <button
                      onClick={() => openModal(order)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-200 text-sm text-red-600"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">{currentOrder ? "Edit Order" : "Add Order"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Check-In</label>
                <input
                  type="date"
                  name="checkin"
                  value={formData.checkin}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Check-Out</label>
                <input
                  type="date"
                  name="checkout"
                  value={formData.checkout}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price Total</label>
                <input
                  type="number"
                  name="price_total"
                  value={formData.price_total}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
