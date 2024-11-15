import React, { useState } from 'react';
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaBed, FaChartLine, FaCog, FaBars } from 'react-icons/fa';

function Menu() {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, key: 'dashboard' },
        { name: 'Reservations', icon: <FaCalendarCheck />, key: 'reservations' },
        { name: 'Customers', icon: <FaUsers />, key: 'customers' },
        { name: 'Rooms', icon: <FaBed />, key: 'rooms' },
        { name: 'Reports', icon: <FaChartLine />, key: 'reports' },
        { name: 'Settings', icon: <FaCog />, key: 'settings' },
    ];

    return (
        <div className="flex h-screen mt-6 bg-white">
            <div className={`rounded-3xl bg-white text-green-900 drop-shadow-xl ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
                <div className="p-4 text-center text-xl font-bold border-b border-green-600 flex justify-between items-center">
                    {isOpen && <span>InnHub</span>}
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <FaBars />
                    </button>
                </div>
                <ul className="mt-4">
                    {menuItems.map(item => (
                        <li key={item.key} className={`p-4 cursor-pointer flex items-center ${active === item.key ? 'bg-green-800 text-white' : 'hover:bg-green-700 hover:text-white'} transition-colors duration-200`} onClick={() => setActive(item.key)}>
                            <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                            {isOpen && item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-green-900">Welcome to the InnHub!</h1>
            </div>
        </div>
    );
}

export default Menu;