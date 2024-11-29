import React, { useState } from 'react';
import { FaHome, FaExchangeAlt, FaUsers, FaHotel, FaExclamationCircle, FaCog, FaBars } from "react-icons/fa";

import img from '../assets/innhublogo.png';
import Hero from './Hero';
import Userlist from './User';

function Menu() {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: "Home", icon: <FaHome />, key: "dashboard" },
        { name: "Transaction", icon: <FaExchangeAlt />, key: "reservations" },
        { name: "User ", icon: <FaUsers />, key: "customers" },
        { name: "Hotel", icon: <FaHotel />, key: "rooms" },
        { name: "Complaint", icon: <FaExclamationCircle />, key: "reports" },
    ];

    return (
        <div className="flex h-screen mt-6 bg-white">
            {/* Sidebar */}
            <div className={`relative rounded-3xl bg-white text-black drop-shadow-xl ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
                {/* Logo and Toggle Button */}
                <div className="p-4 text-center text-xl font-bold border-b border-skyblue-600 flex justify-between items-center">
                    {isOpen && (
                        <div className="flex items-center">
                            <img src={img} alt="InnHub Logo" className="w-8 h-8 mr-2" />
                            <span className="text-slate-950700 drop-shadow-2xl">InnHub</span>
                        </div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <FaBars />
                    </button>
                </div>

                {/* Menu Items */}
                <ul className="mt-4">
                    {menuItems.map(item => (
                        <li
                            key={item.key}
                            className={`left-0 right-0 mx-2 my-2 p-4 cursor-pointer flex items-center rounded-lg font-semibold ${
                                active === item.key ? 'bg-button text-black' : 'hover:bg-button hover:text-black'
                            } transition-colors duration-200`}
                            onClick={() => setActive(item.key)}
                        >
                            <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                            {isOpen && item.name}
                        </li>
                    ))}
                </ul>

                {/* Admin Button */}
                <div
                    className={`absolute bottom-4 left-0 right-0 mx-2 flex items-center p-4 rounded-lg font-semibold ${
                        active === 'admin' ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-700 hover:text-white'
                    } transition-colors duration-200 cursor-pointer`}
                    onClick={() => setActive('admin')}
                >
                    <FaCog className={`${isOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isOpen && <span>Admin</span>}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {active === 'customers' ? <Userlist/> : <Hero />}
            </div>
        </div>
    );
}

export default Menu;