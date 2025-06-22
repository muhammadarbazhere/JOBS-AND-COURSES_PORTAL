import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteOrder = () => {
  const navigate = useNavigate();

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch("route/complete-checkout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentDetails: JSON.parse(localStorage.getItem('paymentDetails')),
          billingAddress: JSON.parse(localStorage.getItem('billingAddress')),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete checkout");
      }

      const { message } = await response.json();
      alert(message);
      navigate('/cart'); // Redirect to order success page or any other page
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <h1>Complete Your Order</h1>
      <button
        onClick={handleCompleteOrder}
        className="bg-pink-500 hover:bg-pink-700 duration-500 text-white font-bold py-2 px-4 rounded"
      >
        Complete Order
      </button>
    </div>
  );
};

export default CompleteOrder;
