import React from 'react'

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
                    <h1 className="text-3xl font-bold mb-6 text-green-700">INN HUB</h1>
                        <h1 className="text-3xl font-semibold mb-6">Get Started Now</h1>
                        <form className="w-full max-w-sm">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email address
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Name" />
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
                                    <span className="ml-2 text-gray-700 text-sm">I agree to the <a href="#" className="text-blue-500">terms & policy</a></span>
                                </label>
                            </div>
                            <div className="mb-6">
                                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full" type="button">
                                    Signup
                                </button>
                            </div>
                            <div className="flex items-center justify-center mb-4">
                                <hr className="w-full border-gray-300" />
                                <span className="absolute bg-white px-4 text-gray-500">Or</span>
                            </div>
                            <div className="text-center">
                                <span className="text-gray-700">Have an account? <a href="#" className="text-blue-500">Sign In</a></span>
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src="src\assets\login bg4.jpg" alt="Large green leaves" className="object-cover h-full w-full" />
                    </div>
                </div>
            );
        }
export default Signup
