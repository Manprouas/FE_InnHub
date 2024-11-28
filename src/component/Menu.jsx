import React, { useState } from 'react';
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaBed, FaChartLine, FaCog, FaBars } from 'react-icons/fa';
import Hero from './Hero';

function Menu() {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: 'Home', icon: <FaTachometerAlt />, key: 'home' },
        { name: 'Transactions', icon: <FaCalendarCheck />, key: 'transactions' },
        { name: 'Users', icon: <FaUsers />, key: 'users' },
        { name: 'Hotels', icon: <FaBed />, key: 'hotels' },
        { name: 'Complaint', icon: <FaChartLine />, key: 'complaint' },
    ];

    const adminItems = [
        { name: 'Admin', icon: <FaCog />, key: 'admin' },
    ];

    return (
        <div className="flex h-screen mt-6 bg-white">
            <div className={`rounded-3xl bg-white text-slate-950 drop-shadow-xl ${isOpen ? 'w-64' : 'w-16'} h-auto transition-width duration-300`}>
                <div className="p-4 text-center text-xl font-bold border-b border-skyblue-600 flex justify-between items-center">
                    {isOpen && <img src='src\assets\logo1.png'></img>}
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <FaBars />
                    </button>
                </div>
                <ul className="mt-4 flex flex-col justify-between h-full">
                    <div>
                        {menuItems.map(item => (
                            <li key={item.key} className={`p-4 cursor-pointer flex items-center m-2  ${active === item.key ? 'bg-yellow-500 text-white rounded-3xl m-2' : 'hover:bg-yellow-500 hover:text-white rounded-3xl'} transition-colors duration-200`} onClick={() => setActive(item.key)}>
                                <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                                {isOpen && item.name}
                            </li>
                        ))}
                    </div>
                    <div className="mt-auto mb-28">
                        <ul>
                            {adminItems.map(item => (
                                <li key={item.key} className={`p-4 cursor-pointer flex items-center m-2 ${active === item.key ? 'bg-yellow-500 text-white rounded-3xl m-2' : 'hover:bg-yellow-500 hover:text-white rounded-3xl'} transition-colors duration-200`} onClick={() => setActive(item.key)}>
                                    <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                                    {isOpen && item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
            </div>
            <div className="flex-1 p-6">
                <Hero />
            </div>
        </div>
    );
}

export default Menu;