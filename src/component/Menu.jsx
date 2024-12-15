import React, { useState } from 'react';
import { FaHome, FaExchangeAlt, FaUsers, FaHotel, FaExclamationCircle, FaCog, FaBars, FaChevronDown } from "react-icons/fa";

import img from '../assets/innhublogo.png';
import Hero from './Hero';
import UserList from './User';
import HotelList from '../component/Hotels/HotelList';
import Admin from './admin';
import Complaint from './complaint';

function Menu() {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);
    const [userDropdown, setUserDropdown] = useState(false); // State untuk toggle dropdown User

    const menuItems = [
        { name: "Home", icon: <FaHome />, key: "dashboard" },
        { name: "Transaction", icon: <FaExchangeAlt />, key: "reservations" },
        { name: "User", icon: <FaUsers />, key: "customers" },
        { name: "Hotel", icon: <FaHotel />, key: "hotels" },
        { name: "Complaint", icon: <FaExclamationCircle />, key: "complaint" },
    ];

    const renderContent = () => {
        switch (active) {
            case 'dashboard':
                return <Hero />;
            case 'customers-data':
                return <CustomerData />;
            case 'customers-history':
                return <BookingHistory />;
            case 'hotels':
                return <HotelList />;
            case 'admin':
                return <Admin />;
            case 'complaint':
                return <Complaint />;
            default:
                return <Hero />;
        }
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Sidebar */}
            <div className={`relative bg-white text-black drop-shadow-xl ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
                <div className="p-4 text-center text-xl font-bold border-b border-skyblue-600 flex justify-between items-center">
                    {isOpen && (
                        <div className="flex items-center">
                            <img src={img} alt="InnHub Logo" className="w-8 h-8 mr-2" />
                            <span className="text-slate-900">InnHub</span>
                        </div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <FaBars />
                    </button>
                </div>

                <ul className="mt-4">
                    {menuItems.map(item => (
                        <li
                            key={item.key}
                            className={`mx-2 my-2 p-4 cursor-pointer flex items-center rounded-lg font-semibold ${
                                active === item.key ? 'bg-button text-black' : 'hover:bg-button hover:text-black'
                            } transition-colors duration-200`}
                            onClick={() => setActive(item.key)}
                        >
                            <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                            {isOpen && item.name}
                        </li>
                    ))}

                    {/* User Menu with Dropdown */}
                    <li
                        className="left-0 right-0 mx-2 my-2 p-4 cursor-pointer flex items-center rounded-lg font-semibold hover:bg-button hover:text-black transition-colors duration-200"
                        onClick={() => setUserDropdown(!userDropdown)}
                    >
                        <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}><FaUsers /></div>
                        {isOpen && <span>User</span>}
                        {isOpen && (
                            <FaChevronDown className={`ml-auto transition-transform ${userDropdown ? 'rotate-180' : 'rotate-0'}`} />
                        )}
                    </li>

                    {/* Dropdown Items */}
                    {userDropdown && isOpen && (
                        <ul className="ml-6">
                            <li
                                className={`p-2 cursor-pointer flex items-center rounded-lg font-semibold hover:bg-gray-200 ${
                                    active === 'customers-data' ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => setActive('customers-data')}
                            >
                                Data Pelanggan
                            </li>
                            <li
                                className={`p-2 cursor-pointer flex items-center rounded-lg font-semibold hover:bg-gray-200 ${
                                    active === 'customers-history' ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => setActive('customers-history')}
                            >
                                Riwayat Booking
                            </li>
                        </ul>
                    )}
                </ul>

                <div
                    className={`absolute bottom-4 left-0 right-0 mx-2 flex items-center p-4 rounded-lg font-semibold ${
                        active === 'admin' ? 'bg-[#4A628A] text-white' : 'bg-[#4A628A] hover:bg-[#FFD900] text-white hover:text-white'
                    } transition-colors duration-200 cursor-pointer`}
                    onClick={() => setActive('admin')}
                >
                    <FaCog className={`${isOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isOpen && <span>Admin</span>}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-[#4A628A]">
                {renderContent()}
            </div>
        </div>
    );
}

export default Menu;
