import React, { useEffect, useState } from "react";
import axios from "axios";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css"; // Gaya bawaan library
import { API_URL } from "../../connection";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [roomGroups, setRoomGroups] = useState([]); // Untuk daftar kamar
  const [reservationItems, setReservationItems] = useState([]); // Untuk item reservasi

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        const data = response.data.data;

        const rooms = {};
        const items = [];

        data.forEach((order, index) => {
          const room = order.roomID;
          const user = order.userID;

          if (!rooms[room._id]) {
            rooms[room._id] = {
              id: room._id,
              title: `${room.roomtype} (${room.price}$)`,
            };
          }
          
          items.push({
            id: order._id,
            group: room._id,
            title: user.username, // Nama user
            start_time: new Date(order.checkin).getTime(),
            end_time: new Date(order.checkout).getTime(),
            itemProps: {
              // Props tambahan untuk hover
              "data-tooltip": `User: ${user.username} (${user.email})\nPrice: ${room.price}$\nRoom: ${room.roomtype}`,
            },
          });
        });

        setRoomGroups(Object.values(rooms));
        setReservationItems(items);
      } catch (error) {
        console.error("Failed to fetch reservations:", error.response?.data || error.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Reservations</h2>

      <Timeline
        groups={roomGroups} // Data kamar
        items={reservationItems} // Data reservasi
        defaultTimeStart={new Date()} // Waktu awal default
        defaultTimeEnd={new Date().setDate(new Date().getDate() + 7)} // 7 hari ke depan
        lineHeight={60} // Tinggi per baris
        canMove={false} // Nonaktifkan pergerakan item
        canResize={false} // Nonaktifkan perubahan ukuran item
        itemRenderer={({ item, itemContext, getItemProps }) => {
          return (
            <div
              {...getItemProps({
                style: {
                  ...itemContext.style,
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#fff",
                  backgroundColor: "#007bff",
                },
              })}
              title={item.itemProps["data-tooltip"]}
            >
              {item.title}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ReservationList;
