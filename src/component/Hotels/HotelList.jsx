import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]); // State to store rooms for the selected hotel
    const [selectedRoom, setSelectedRoom] = useState(null); // State to store the selected room for editing
    const [isEditingRoom, setIsEditingRoom] = useState(false); // State for toggling room edit mode

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:3000/hotels');
            setHotels(response.data.data);
            setIsLoading(false);
        } catch (err) {
            setError('Gagal memuat daftar hotel');
            setIsLoading(false);
        }
    };

    const fetchRoomsForHotel = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/rooms`);
            setRooms(response.data.data);
        } catch (err) {
            console.error("Error fetching rooms:", err);
        }
    };

    const handleRowClick = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
        setIsEditingRoom(false);
        fetchRoomsForHotel(hotel._id); // Fetch rooms for the selected hotel
    };

    const handleRoomDetailsClick = (room) => {
        setSelectedRoom(room);
        setIsEditingRoom(true); // Open room editing mode
    };

    const handleUpdateRoom = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/rooms/${selectedRoom._id}`, selectedRoom);
            setRooms(rooms.map((room) =>
                room._id === selectedRoom._id ? response.data.data : room
            ));
            setIsEditingRoom(false); // Close editing mode
        } catch (err) {
            setError('Gagal memperbarui data kamar');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (selectedRoom) {
            setSelectedRoom(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (selectedHotel) {
            setSelectedHotel(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSaveHotel = async () => {
        try {
            if (selectedHotel._id) {
                const response = await axios.put(`http://localhost:3000/hotels/${selectedHotel._id}`, selectedHotel);
                setHotels(hotels.map(hotel =>
                    hotel._id === selectedHotel._id ? response.data.data : hotel
                ));
            } else {
                const response = await axios.post('http://localhost:3000/hotels/create', selectedHotel);
                setHotels([...hotels, response.data.data]);
            }
            setIsModalOpen(false);
            setSelectedHotel(null);
        } catch (err) {
            setError('Gagal menyimpan hotel');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar Hotel</h2>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Nama Hotel</th>
                        <th className="p-2">Alamat</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Telepon</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-200'>
                    {hotels.map((hotel) => (
                        <tr
                            key={hotel._id}
                            className="border-b hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRowClick(hotel)}
                        >
                            <td className="p-2">{hotel.hotelname}</td>
                            <td className="p-2">{hotel.address}</td>
                            <td className="p-2">{hotel.email}</td>
                            <td className="p-2">{hotel.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedHotel && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative"> {/* Increased max-width */}
            <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
                ✕
            </button>

            <h3 className="text-xl font-bold mb-4">
                {selectedHotel._id ? 'Edit Hotel' : 'Tambah Hotel Baru'}
            </h3>

            <div className="space-y-4">
                <input
                    type="text"
                    name="hotelname"
                    placeholder="Nama Hotel"
                    value={selectedHotel.hotelname}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Alamat Hotel"
                    value={selectedHotel.address}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Hotel"
                    value={selectedHotel.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Telepon Hotel"
                    value={selectedHotel.phone}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mt-4">
                {rooms.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2">Jenis Kamar</th>
                                <th className="p-2">Harga</th>
                                <th className="p-2">Alamat Kamar</th>
                                <th className="p-2">Telepon Kamar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room._id} className="border-b hover:bg-gray-100">
                                    <td className="p-2">{room.roomtype}</td>
                                    <td className="p-2">Rp {room.price.toLocaleString()}</td>
                                    <td className="p-2">{room.address}</td>
                                    <td className="p-2">{room.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRoomDetailsClick(room)}
                                            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
                                        >
                                            Edit Room
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Tidak ada kamar.</p>
                )}
            </div>

            {isEditingRoom && selectedRoom && (
                <div className="space-y-4 mt-4">
                    <h3 className="text-xl font-bold">Edit Kamar</h3>
                    <input
                        type="text"
                        name="roomtype"
                        placeholder="Jenis Kamar"
                        value={selectedRoom.roomtype}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Harga"
                        value={selectedRoom.price}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Alamat Kamar"
                        value={selectedRoom.address}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Telepon Kamar"
                        value={selectedRoom.phone}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <button
                        onClick={handleUpdateRoom}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Room
                    </button>
                </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={handleSaveHotel}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Simpan Hotel
                </button>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Batal
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}

export default HotelList;
