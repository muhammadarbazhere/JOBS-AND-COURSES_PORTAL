import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found</p>
      <p className="mt-2 text-lg">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-100 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
