import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan sudah install axios
import { FaUser, FaHotel } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { GoReport } from "react-icons/go";

function Hero() {
    // State untuk menyimpan data dashboard
    const [dashboardData, setDashboardData] = useState({
        userCount: 0,
        transactionCount: 0,
        hotelCount: 0,
        complaintCount: 0
    });

    // State untuk loading
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fungsi untuk fetch data dashboard
    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            // Sesuaikan URL dengan endpoint backend Anda
            const response = await axios.get('http://localhost:3000/dashboard');
            
            // Pastikan struktur response sesuai
            if (response.data && response.data.success) {
                setDashboardData(response.data.data);
            }
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err);
            setIsLoading(false);
        }
    };

    // Panggil fetchDashboardData saat komponen mount
    useEffect(() => {
        fetchDashboardData();
    }, []); // Array kosong berarti hanya dijalankan sekali saat komponen mount

    // Tampilan loading
    if (isLoading) {
        return (
            <div className="p-8">
                <div className="grid grid-cols-3 gap-8 animate-pulse">
                    {/* Placeholder loading */}
                    <div className="bg-gray-200 col-span-2 p-6 rounded-lg shadow-md"></div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md"></div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md"></div>
                    <div className="bg-gray-200 col-span-2 p-6 rounded-lg shadow-md"></div>
                </div>
            </div>
        );
    }

    // Tampilan error
    if (error) {
        return (
            <div className="p-8 text-red-500">
                Gagal memuat data dashboard. Silakan coba lagi.
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
                <div className="bg-yellow-100 col-span-2 p-6 rounded-lg shadow-md">
                    <div className="text-3xl font-bold mb-2">User</div>
                    <div className="text-green-600 text-2xl font-bold">
                        +{dashboardData.userCount}
                    </div>
                    <div className="text-gray-600">User Today</div>
                    <div className="mt-4 text-4xl flex justify-end">
                        <FaUser />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-xl font-bold mb-2">Transaction</div>
                    <div className="text-green-600 text-2xl font-bold">
                        +{dashboardData.transactionCount}
                    </div>
                    <div className="text-gray-600">Transaction Today</div>
                    <div className="mt-4 text-4xl flex justify-end">
                        <GrTransaction />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-xl font-bold mb-2">Complaint</div>
                    <div className="text-red-600 text-2xl font-bold">
                        +{dashboardData.complaintCount}
                    </div>
                    <div className="text-gray-600">Complaint Today</div>
                    <div className="mt-4 text-4xl flex justify-end">
                        <GoReport />
                    </div>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg col-span-2 shadow-md">
                    <div className="text-xl font-bold mb-2">Hotel</div>
                    <div className="text-green-600 text-2xl font-bold">
                        +{dashboardData.hotelCount}
                    </div>
                    <div className="text-gray-600">Hotel Today</div>
                    <div className="mt-4 text-4xl flex justify-end">
                        <FaHotel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;