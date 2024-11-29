import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for hotels..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 107 7 7 7 0 00-7-7zm0 0l4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Search;
