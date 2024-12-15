import React, { useEffect, useState } from "react";

function Complaint() {
    const [complaints, setComplaints] = useState([]); // State untuk menyimpan data komplain
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState(null); // State untuk error
    const [popup, setPopup] = useState({ visible: false, id: null }); // State untuk modal konfirmasi resolve
    const [informModal, setInformModal] = useState({ visible: false, id: null }); // State untuk modal konfirmasi inform hotel
    const [resolving, setResolving] = useState(false); // State untuk loader saat resolve
    const [informing, setInforming] = useState(false); // State untuk loader saat inform
    const [successModal, setSuccessModal] = useState(false); // State untuk modal sukses

    // Fetch data dari backend
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch("http://localhost:3000/complaints"); // Ganti dengan URL backend Anda
                if (!response.ok) {
                    throw new Error("Failed to fetch complaints");
                }
                const data = await response.json();
                setComplaints(data.data); // Update state dengan data dari API
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const handleInformHotelClick = (id) => {
        setInformModal({ visible: true, id });
    };

    const confirmInformHotel = async (id) => {
        setInforming(true);
        try {
            // Simulasi update status di backend
            setTimeout(() => {
                setComplaints((prevComplaints) =>
                    prevComplaints.map((complaint) =>
                        complaint._id === id
                            ? { ...complaint, status: "In Progress" }
                            : complaint
                    )
                );
                setInformModal({ visible: false, id: null });
                setSuccessModal(true); // Tampilkan modal sukses
            }, 2000);
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setInforming(false);
        }
    };

    const cancelInformHotel = () => {
        setInformModal({ visible: false, id: null });
    };

    const handleResolveClick = (id) => {
        setPopup({ visible: true, id });
    };

    const confirmResolve = async (id) => {
        setResolving(true);
        try {
            // Update status di backend
            const response = await fetch(`http://localhost:3000/complaints/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "Resolved" }),
            });

            if (!response.ok) {
                throw new Error("Failed to update complaint status");
            }

            // Update status di frontend
            setComplaints((prevComplaints) =>
                prevComplaints.map((complaint) =>
                    complaint._id === id
                        ? { ...complaint, status: "Resolved" }
                        : complaint
                )
            );
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setResolving(false);
            setPopup({ visible: false, id: null });
        }
    };

    const cancelResolve = () => {
        setPopup({ visible: false, id: null });
    };

    if (loading) {
        return <div>Loading complaints...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className= "p-6 h-screen overflow-auto">
            <h1 className="text-2xl text-white font-bold mb-4">List of Complaints</h1>
            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint._id}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="font-bold">Complaint ID:</p>
                                    <p>{complaint._id}</p>
                                </div>
                                <p className="bg-red-500 text-white px-4 py-1 rounded">
                                    {complaint.type}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-2">Details:</h2>
                                <p>
                                    <span className="font-bold">Description:</span>{" "}
                                    {complaint.description}
                                </p>
                                <p>
                                    <span className="font-bold">User:</span>{" "}
                                    {complaint.userID?.email || "Unknown"}
                                </p>
                                <p>
                                    <span className="font-bold">Hotel:</span>{" "}
                                    {complaint.hotelID?.hotelname || "Unknown"}
                                </p>
                                <p>
                                    <span className="font-bold">Room :</span>{" "}
                                    {complaint.roomID?.roomtype || "Unknown"}
                                </p>
                            </div>
                            {complaint.photo && (
                                <div className="mt-4">
                                    <p className="font-bold">Photo:</p>
                                    <img
                                        src={complaint.photo}
                                        alt="Complaint"
                                        className="w-24 h-24 mt-2"
                                    />
                                </div>
                            )}
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleInformHotelClick(complaint._id)}
                                    disabled={complaint.status !== "Pending"}
                                >
                                    Inform Hotel
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        complaint.status === "Resolved"
                                            ? "bg-gray-200 text-gray-400"
                                            : "bg-green-500 text-white"
                                    }`}
                                    onClick={() => handleResolveClick(complaint._id)}
                                    disabled={complaint.status === "Resolved"}
                                >
                                    {complaint.status === "Resolved"
                                        ? "Resolved"
                                        : "Resolve"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Konfirmasi Inform Hotel */}
            {informModal.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Inform this complaint to the hotel?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className={`px-4 py-2 rounded ${
                                    informing ? "bg-gray-400" : "bg-yellow-500 text-white"
                                }`}
                                onClick={() => confirmInformHotel(informModal.id)}
                                disabled={informing}
                            >
                                {informing ? "Informing..." : "Yes"}
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                                onClick={cancelInformHotel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Resolve */}
            {popup.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Resolve Complaint?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className={`px-4 py-2 rounded ${
                                    resolving ? "bg-gray-400" : "bg-red-500 text-white"
                                }`}
                                onClick={() => confirmResolve(popup.id)}
                                disabled={resolving}
                            >
                                {resolving ? "Resolving..." : "Yes"}
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                                onClick={cancelResolve}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Sukses Inform Hotel */}
            {successModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Successfully informed the hotel!
                        </h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => setSuccessModal(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Complaint;
