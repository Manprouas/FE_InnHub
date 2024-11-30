import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleRowClick = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
        setIsEditing(false);
    };

    const handleAddHotel = () => {
        setSelectedHotel({
            hotelname: '',
            address: '',
            email: '',
            phone: ''
        });
        setIsModalOpen(true);
        setIsEditing(true);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveHotel = async () => {
        try {
            if (selectedHotel._id) {
                // Update existing hotel
                const response = await axios.put(`http://localhost:3000/hotels/${selectedHotel._id}`, selectedHotel);
                setHotels(hotels.map(hotel => 
                    hotel._id === selectedHotel._id ? response.data.data : hotel
                ));
            } else {
                // Add new hotel
                const response = await axios.post('http://localhost:3000/hotels', selectedHotel);
                setHotels([...hotels, response.data.data]);
            }
            setIsModalOpen(false);
            setSelectedHotel(null);
            setIsEditing(false);
        } catch (err) {
            setError('Gagal menyimpan hotel');
        }
    };

    const handleDeleteHotel = async () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus hotel ini?')) {
            try {
                await axios.delete(`http://localhost:3000/hotels/${selectedHotel._id}`);
                setHotels(hotels.filter(hotel => hotel._id !== selectedHotel._id));
                setIsModalOpen(false);
                setSelectedHotel(null);
            } catch (err) {
                setError('Gagal menghapus hotel');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedHotel(prev => ({
            ...prev,
            [name]: value
        }));
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
                <button 
                    onClick={handleAddHotel}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Tambah Hotel
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Nama Hotel</th>
                        <th className="p-2">Alamat</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Telepon</th>
                    </tr>
                </thead>
                <tbody>
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

            {/* Modal untuk Detail/Edit Hotel */}
            {isModalOpen && selectedHotel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-bold mb-4">
                            {isEditing ? (selectedHotel._id ? 'Edit Hotel' : 'Tambah Hotel Baru') : 'Detail Hotel'}
                        </h3>

                        {isEditing ? (
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
                                    placeholder="Alamat"
                                    value={selectedHotel.address}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={selectedHotel.email}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Telepon"
                                    value={selectedHotel.phone}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p><strong>Nama Hotel:</strong> {selectedHotel.hotelname}</p>
                                <p><strong>Alamat:</strong> {selectedHotel.address}</p>
                                <p><strong>Email:</strong> {selectedHotel.email}</p>
                                <p><strong>Telepon:</strong> {selectedHotel.phone}</p>
                            </div>
                        )}

                        <div className="flex justify end space-x-2 mt-4">
                            {isEditing ? (
                                <>
                                    <button 
                                        onClick={handleSaveHotel}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Simpan
                                    </button>
                                    <button 
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Batal
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={handleEditToggle}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={handleDeleteHotel}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotelList;