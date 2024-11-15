import React from 'react'

const Contact = () => {
  return (
<div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-center text-yellow-400">Contact Us</h1>
                            <p className="mt-2 text-center text-lg text-green-700">
                                We'd love to hear from you! Please fill out the form below to get in touch.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-500 placeholder-green-700 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-700 focus:z-10 sm:text-sm" placeholder="Name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-500 placeholder-green-700 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-700 focus:z-10 sm:text-sm" placeholder="Email address" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" name="message" rows="4" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-500 placeholder-green-700 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-700 focus:z-10 sm:text-sm" placeholder="Message"></textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Send Message
                                </button>
                            </div>
                        </form>
                        <div className="mt-8 text-center text-green-700">
                            <p>Or reach us at:</p>
                            <p className="mt-2"><i className="fas fa-phone-alt"></i> +1 234 567 890</p>
                            <p className="mt-2"><i className="fas fa-envelope"></i> Mzidanm@transcorp.com</p>
                            <p className="mt-2"><i className="fas fa-map-marker-alt"></i> Rusdi Hotel Muwani St, Ngawi, Jomokerto</p>
                        </div>
                    </div>
                </div>
            );
        };
export default Contact
