import React from 'react'


const Login = () => {
  return (
    <div className="relative h-screen flex items-center justify-end bg-[#4A5A7A]">
      <div className="bg-[#7A8BAA] bg-opacity-80 rounded-2xl  w-[28rem] h-3/4 p-14 relative mr-16 z-10">
        <div className='mt-8'>
        <h1 className="text-3xl font-bold text-white">Hi Admin!</h1>
        <p className="text-xl text-white mb-6">Log in to InnHub</p>
        <p className="text-lg text-white mb-2">Email</p>
        <input
          className="bg-[#4A5A7A] border-none rounded-lg p-4 w-full h-12 mb-4 text-white"
          placeholder="Email"
          type="text"
        />
        <p className="text-lg text-white mb-2">Password</p>
        <input
          className="bg-[#4A5A7A] border-none rounded-lg p-4 w-full h-12 mb-4 text-white"
          placeholder="Password"
          type="password"
        />
        <div className="flex items-center mb-6">
          <input className="mr-2" id="stayLogged" type="checkbox" />
          <label className="text-white" htmlFor="stayLogged">
            Stay logged
          </label>
        </div>
        <button className="bg-[#FFEBB7] border-none rounded-lg p-4 w-full text-black font-bold">
          Log In
        </button>
        <a className="absolute right-10 bottom-24 text-[#7A8BAA]" href="#">
          Forgotten?
        </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 flex items-center">
        <img
          alt="InnHub logo"
          className="mr-24 mb-12 ml-8"
          height="350"
          src="src/assets/Group 3.png"
          width="350"
        />
      </div>
      <img
        alt="Sun illustration"
        className="absolute top-0 left-0 w-42 h-42"
        height="200"
        src="src/assets/2698240 1.png"
        width="200"
      />
      <img
        alt="Buildings illustration"
        className="absolute bottom-0 right-0 w-64 h-80 z-0"
        height="200"
        src="src/assets/hotel_776519 1.png"
        width="200"
      />
    </div>
);
}



export default Login
