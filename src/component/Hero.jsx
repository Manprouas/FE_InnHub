import React from 'react';
import { FaUser,FaHotel } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { GoReport } from "react-icons/go";

function Hero() {
    return (
        <div className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="bg-yellow-100 col-span-2 p-6 rounded-lg shadow-md">
                            <div className="text-3xl font-bold mb-2">User</div>
                            <div className="text-green-600 text-2xl font-bold">+3</div>
                            <div className="text-gray-600">User Today</div>
                            <div className="mt-4 text-4xl flex justify-end">
                            <FaUser />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-xl font-bold mb-2">Transaction</div>
                            <div className="text-green-600 text-2xl font-bold">+10</div>
                            <div className="text-gray-600">Transaction Today</div>
                            <div className="mt-4 text-4xl flex justify-end">
                            <GrTransaction />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-xl font-bold mb-2">Complaint</div>
                            <div className="text-red-600 text-2xl font-bold">+2</div>
                            <div className="text-gray-600">Complaint Today</div>
                            <div className="mt-4 text-4xl flex justify-end">
                            <GoReport />
                            </div>
                        </div>
                        <div className="bg-yellow-100 p-6 rounded-lg col-span-2 shadow-md">
                            <div className="text-xl font-bold mb-2">Hotel</div>
                            <div className="text-green-600 text-2xl font-bold">+3</div>
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
