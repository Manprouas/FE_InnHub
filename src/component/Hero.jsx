import React from 'react';
import heroImage from '../assets/bg hero5.jpg'; // Pastikan jalurnya sesuai dengan struktur folder

function Hero() {
    return (
        <section
            className="relative text-white py-20 mt-3"
            style={{
                backgroundImage: `url(${heroImage})`, // Gunakan template literal untuk memasukkan jalur gambar
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-200 opacity-75"></div>
            <div className="relative container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-100">
                    Welcome to InnHub 
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Manage your hotel reservations with ease and efficiency
                </p>
                <button className="bg-blue-400 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300 shadow-lg">
                    Get Started
                </button>
            </div>
        </section>
    );
}

export default Hero;
