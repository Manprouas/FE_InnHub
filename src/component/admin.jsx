import React from 'react';
import { FaUsers } from "react-icons/fa";

const Admin = () => {
    return (
        <div className="min-h-screen flex-col items-center pt-8 px-4">
            <div className="container mx-auto max-w-md bg-white rounded-lg shadow-lg p-6">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Close</button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6">
                    {/* Icon Section */}
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <FaUsers className='h-12 w-12 text-gray-500' />
                    </div>

                    {/* Text and Details Section */}
                    <div className="text-center">
                        <h1 className="text-xl font-bold mb-2">HI Admin!</h1>
                        <div className='text-justify'>
                        <p className="text-gray-700 mb-1">Nama: Juidat</p>
                        <p className="text-gray-700 mb-4">Email: juidatrobocop@gmail.com</p>
                        </div>
                        
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 w-full">Edit Profile</button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded flex justify-end">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
