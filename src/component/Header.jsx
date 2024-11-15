import React, { useState } from 'react';
import { IoSearch, IoFilterSharp } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // mobile menu
    <header className="px-4 bg-white relative">
      {/* Search Bar */}
      <div
        onClick={handleToggle}
        className="rounded-full flex items-center p-3 px-6 mt-4 shadow-xl cursor-pointer"
      >
        <IoSearch className="text-black mr-3 text-2xl" />
        <div className="flex-grow">
          <p className="text-sm font-medium">Ingin ke mana?</p>
          <p className="text-xs text-gray-400">Ke mana saja • Minggu apa • Tambahkan Tamu</p>
        </div>
        <button className="ml-3 bg-gray-200 p-2 rounded-full">
          <IoFilterSharp />
        </button>
      </div>

      {/* Pop-up Menu */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white p-6 rounded-t-3xl shadow-xl transform transition-transform duration-300 ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ zIndex: 50 }}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="text-lg font-semibold">Ingin ke mana?</span>
          <button onClick={handleToggle} className="text-xl">&times;</button>
        </div>
        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Cari destinasi"
            className="w-full p-2 border rounded-lg"
          />
          <div className="grid grid-cols-3 gap-2">
            {/* Example destination cards */}
            <div className="p-4 bg-gray-200 rounded-lg text-center">Fleksibel</div>
            <div className="p-4 bg-gray-200 rounded-lg text-center">Eropa</div>
            <div className="p-4 bg-gray-200 rounded-lg text-center">Malaysia</div>
            {/* Add more as needed */}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border rounded-lg">
              <span>Tanggal perjalanan</span>
              <span className="text-gray-400">Tambahkan tanggal</span>
            </div>
            <div className="flex justify-between items-center p-2 border rounded-lg">
              <span>Peserta</span>
              <span className="text-gray-400">Tambahkan tamu</span>
            </div>
          </div>
          <button className="w-full p-2 bg-pink-500 text-white rounded-lg mt-4">Cari</button>
        </div>
      </div>
    </header>
  );
};

export default Header;