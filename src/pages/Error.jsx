import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Error Code */}
      <h1 className="text-9xl font-extrabold tracking-widest text-red-500 animate-pulse">
        404
      </h1>

      {/* Error Message */}
      <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-300">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-md md:text-lg text-gray-400">
        The page you are looking for doesn’t exist.
      </p>

      {/* Go Back Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-medium bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out"
      >
        Go Back Home
      </Link>

      {/* Animated Decorative Element */}
      <div className="absolute bottom-10 flex gap-2 text-gray-600">
        <span className="animate-bounce">⬆</span>
        <span className="animate-bounce delay-100">⬆</span>
        <span className="animate-bounce delay-200">⬆</span>
      </div>
    </div>
  );
};

export default Error;
