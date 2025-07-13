import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    return (
        <div className="p-2">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center 
                            font-[Chivo] bg-gray-800/60 backdrop-blur-lg border border-gray-700 
                            rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-xl transition-all duration-300">
                
                {/* Breadcrumb */}
                <div className="text-gray-300 text-xs sm:text-sm md:text-base tracking-wide text-center sm:text-left">
                    You are here: <span className="text-gray-400">Home / Dashboard</span>
                </div>
                
                {/* Add Items Button */}
                <Link
                    to="/MyAdmin"
                    className="relative inline-flex items-center justify-center 
                               px-4 sm:px-6 py-2 sm:py-3 overflow-hidden font-medium 
                               text-white transition duration-300 ease-out border-2 border-green-500 
                               rounded-full shadow-lg group hover:bg-gradient-to-r 
                               hover:from-green-500 hover:to-green-700 hover:shadow-green-500/50"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                    <span className="relative z-10 text-sm sm:text-base">Control Panel</span>
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
