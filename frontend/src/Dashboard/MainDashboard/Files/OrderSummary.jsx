import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    return (
       <div>
         <div className="flex flex-row font-[Chivo] justify-between  items-center bg-blue-100 px-1 py-2 sm:p-4 ml-0 sm:ml-56">
            <div className="text-gray-800 text-xs md:text-sm mb-2 ">
                {/* You are here:<span className="text-gray-600">
                   Home / Dashboard</span> */}
            </div>
            <Link to='/MyAdmin' className="bg-green-500 hover:bg-green-700 text-white font-bold sm:py-2 py-1 px-2 sm:px-4 rounded duration-500">
                + ADD ITEMS
            </Link>

            
        </div>
 </div>
      
    );
};

export default OrderSummary;
