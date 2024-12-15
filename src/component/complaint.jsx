import React from "react";

function Complaint() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Close</button>
                <div className="text-right">
                    <p className="text-sm font-bold">Complaint type :</p>
                    <p className="bg-red-500 text-white px-4 py-1 rounded mt-1">FACILITY PROBLEM</p>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2">DETAILS :</h2>
                <div className="text-sm mb-2">
                    <p><span className="font-bold">ID</span> : 002</p>
                    <p><span className="font-bold">USER ID</span> : 0892</p>
                    <p><span className="font-bold">HOTEL ID</span> : 0023</p>
                    <p><span className="font-bold">DESCRIPTION</span> :</p>
                    <p>Saya ingin menyampaikan keluhan terkait fasilitas kamar yang saya tempati. AC di kamar 99 tidak berfungsi dengan baik, meskipun sudah saya coba atur ke suhu terendah. Akibatnya, kamar menjadi sangat panas dan tidak nyaman untuk beristirahat. Saya berharap masalah ini dapat segera diperbaiki atau diberikan solusi yang memadai.</p>
                </div>
                <div className="text-sm mb-4">
                    <p><span className="font-bold">PHOTO</span> :</p>
                    <div className="flex space-x-2 mt-2">
                        <img src="https://placehold.co/50x50" alt="Photo 1" className="w-12 h-12 bg-gray-200"/>
                        <img src="https://placehold.co/50x50" alt="Photo 2" className="w-12 h-12 bg-gray-200"/>
                        <img src="https://placehold.co/50x50" alt="Photo 3" className="w-12 h-12 bg-gray-200"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Inform Hotel</button>
                <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded" disabled>Resolve</button>
            </div>
        </div>
    );
}

export default Complaint;