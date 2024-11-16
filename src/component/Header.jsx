import React, { useState } from "react";
import { IoSearch,IoFilterSharp,} from "react-icons/io5";
import {GiTheaterCurtains,GiPopcorn,GiTreehouse,GiUfo,GiMountainClimbing,GiWindmill,GiCastle,GiIsland,GiCampfire,GiWaterfall,} from "react-icons/gi";
import DatePicker from 'react-date-picker';
import { DateRangePicker } from 'react-date-range';
import 'react-date-picker/dist/DatePicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const menuItems = [
    { id: 1, label: "Pemandangan cantik", icon: <GiTheaterCurtains /> },
    { id: 2, label: "Ikon Pop", icon: <GiPopcorn /> },
    { id: 3, label: "Rumah pohon", icon: <GiTreehouse /> },
    { id: 4, label: "Wow!", icon: <GiUfo /> },
    { id: 5, label: "Puncak dunia", icon: <GiMountainClimbing /> },
    { id: 6, label: "Kincir angin", icon: <GiWindmill /> },
    { id: 7, label: "Kastil", icon: <GiCastle /> },
    { id: 8, label: "Pulau", icon: <GiIsland /> },
    { id: 9, label: "Kemah", icon: <GiCampfire /> },
    { id: 10, label: "Air Terjun", icon: <GiWaterfall /> },
  ];

  const handleMenuClick = (id) => {
    setSelectedMenu(id);
    console.log(`Menu dengan ID ${id} dipilih`);
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
    setShowGuestPicker(false);
};

const handleGuestClick = () => {
    setShowGuestPicker(true);
    setShowDatePicker(false);
};

const handleClosePicker = () => {
    setShowDatePicker(false);
    setShowGuestPicker(false);
};

  return (
    <header className="px-4 bg-white relative shadow-md pb-4">
      {/* Search Bar */}
      <div
        onClick={handleToggle}
        className="rounded-full flex items-center p-3 px-6 mt-4 shadow-xl cursor-pointer"
      >
        <IoSearch className="text-black mr-3 text-2xl" />
        <div className="flex-grow">
          <p className="text-sm font-medium">Ingin ke mana?</p>
          <p className="text-xs text-gray-400">
            Ke mana saja • Minggu apa • Tambahkan Tamu
          </p>
        </div>
        <button className="ml-3 border border-black p-3 rounded-full">
          <IoFilterSharp />
        </button>
      </div>

      {/* Scrollable Menu */}
      <div className="mt-6">
        <ul className="flex space-x-6 overflow-x-scroll whitespace-nowrap overscroll-none scroll-smooth no-scrollbar">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex flex-col items-center justify-center cursor-pointer ${
                selectedMenu === item.id
                  ? "text-pink-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="text-xs mt-2 text-center">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pop-up Menu */}
      <div className={`fixed inset-0 bg-white p-6 rounded-t-3xl shadow-xl transform transition-transform duration-300 ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ zIndex: 50 }}>
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
                    <div className="p-4 bg-gray-200 rounded-lg text-center">
                        Fleksibel
                    </div>
                    <div className="p-4 bg-gray-200 rounded-lg text-center">
                        Eropa
                    </div>
                    <div className="p-4 bg-gray-200 rounded-lg text-center">
                        Malaysia
                    </div>
                </div>
                <div className="space-y-2">
                    <div onClick={handleDateClick} className="flex justify-between items-center p-2 border rounded-lg cursor-pointer">
                        <span>Tanggal perjalanan</span>
                        <span className="text-gray-400">Tambahkan tanggal</span>
                    </div>
                    <div onClick={handleGuestClick} className="flex justify-between items-center p-2 border rounded-lg cursor-pointer">
                        <span>Peserta</span>
                        <span className="text-gray-400">Tambahkan tamu</span>
                    </div>
                </div>
                <button className="w-full p-2 bg-pink-500 text-white rounded-lg mt-4">
                    Cari
                </button>
            </div>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Kapan perjalanan Anda?</span>
                            <button onClick={handleClosePicker} className="text-xl">&times;</button>
                        </div>
                        <div className="mb-4">
                            <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                            />
                        </div>
                        <div className="mb-4">
                            <DateRangePicker
                                ranges={range}
                                onChange={item => setRange([item.selection])}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Guest Picker Modal */}
            {showGuestPicker && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Siapa yang ikut?</span>
                            <button onClick={handleClosePicker} className="text-xl">&times;</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Dewasa</span>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setAdults(Math.max(0, adults - 1))} className="p-1 border rounded">-</button>
                                    <span>{adults}</span>
                                    <button onClick={() => setAdults(adults + 1)} className="p-1 border rounded">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Anak-anak</span>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-1 border rounded">-</button>
                                    <span>{children}</span>
                                    <button onClick={() => setChildren(children + 1)} className="p-1 border rounded">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Balita</span>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="p-1 border rounded">-</button>
                                    <span>{infants}</span>
                                    <button onClick={() => setInfants(infants + 1)} className="p-1 border rounded">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Hewan peliharaan</span>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setPets(Math.max(0, pets - 1))} className="p-1 border rounded">-</button>
                                    <span>{pets}</span>
                                    <button onClick={() => setPets(pets + 1)} className="p-1 border rounded">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </header>
  );
};

export default Header;
