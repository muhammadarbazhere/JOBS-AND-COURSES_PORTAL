import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-10 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-700 mb-4">Thank you for your purchase. Your order has been successfully processed.</p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
