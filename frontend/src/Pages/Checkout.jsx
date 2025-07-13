import React, { useState, useEffect } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcJcb,
  FaCcStripe,
  FaChevronDown,
} from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import countries from "./countries"; 
import logo from '../assets/logo.jpg';
import { useSelector } from "react-redux";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [billingAddress, setBillingAddress] = useState({ country: "Pakistan" });
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const location = useLocation();
  const { discount } = location.state || { discount: 0 };
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/cart/getUserCart`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      const formattedCart = data.map((item) => ({
        _id: item.course._id,
        title: item.course.title,
        charges: item.course.charges,
        image: item.course.image,
      }));

      setCart(formattedCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleProceedForCredit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/payment/credit-card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart,
            discount,
            paymentDetails,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Payment failed: ${errorData}`);
      }

      const { transactionId } = await response.json();
      alert(`Payment successful! Transaction ID: ${transactionId}`);
      navigate('/order-success');
    } catch (error) {
      console.error("Error during payment:", error.message);
    }
  };

  const total = cart.reduce((acc, course) => acc + course.charges, 0);
  const discountedTotal = total - total * discount;

  const handleCancel = () => {
    navigate('/cart');
  };

  return (
    <div>
      <div className="bg-blue-100 border-b-2 border-gray-300 w-full p-1 flex items-center justify-between">
        <p className="flex items-center sm:px-6">
          <span>
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </span>
          <h1 className="font-bold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-xl sm:text-2xl xl:text-2xl">
            Arbaz WebCraft
          </h1>
        </p>
        <button
          onClick={handleCancel}
          className="px-6 text-pink-500 hover:text-pink-700 duration-300 font-bold"
        >
          Cancel
        </button>
      </div>

      <div className="py-10 m-0 bg-blue-100 h-full items-center justify-center flex">
        <div className="flex lg:flex-row flex-col gap-12 justify-center px-6 lg:px-0">
          <div className="w-full lg:w-2/4 2xl:w-full">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-3">
                  Billing address
                </label>
                <div className="relative gap-5">
                  <CiGlobe
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <select
                    name="country"
                    value={billingAddress.country}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        country: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Credit/Debit Card
              </label>
              <div className="mb-4 border border-gray-400 px-4 py-3 rounded">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-md font-bold sm:text-lg flex items-center gap-2 text-gray-700">
                    <span className="border border-gray-400 p-1 rounded-md">
                      <FaCreditCard size={20} />
                    </span>
                    <span> Credit/Debit Card</span>
                  </p>
                  <div className="grid grid-cols-3 sm:flex gap-2">
                    <FaCcVisa size={30} className="text-blue-700" />
                    <FaCcMastercard size={30} className="text-green-700" />
                    <FaCcDiscover size={30} className="text-teal-700" />
                    <FaCcJcb size={30} className="text-orange-700" />
                    <FaCcStripe size={30} className="text-purple-700" />
                  </div>
                </div>
                <div>
                  <label>Name on card</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on card"
                    value={paymentDetails.nameOnCard}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <label>Expiry date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <label>CVC/CVV</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={paymentDetails.cvc}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </form>

            <div className="w-full mb-4">
              <h1 className="text-gray-700 font-bold text-2xl mb-2">Order Details</h1>
              <div className="flex flex-col gap-4">
                {cart.map((course) => (
                  <div
                    key={course._id}
                    className="lg:flex items-center justify-between bg-white border-2 border-gray-200 p-4 rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/route/${course.image}`}
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col items-start justify-between w-full">
                        <div className="text-lg font-semibold">{course.title}</div>
                        <div className="text-gray-600 flex flex-col items-end">
                          <span>${course.charges.toFixed(2)}</span>
                          <span className="line-through">${(course.charges * 5.7).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-2/6 flex-col items-center lg:pt-11 pt-2">
            <p className="text-2xl font-bold mb-4 w-full">Summary</p>
            <div className="mb-4 text-md w-full">
              <div className="text-gray-700 flex justify-between mb-1">
                <p>Original Price:</p>
                <p>${(total * 5.7 - total * discount).toFixed(2)}</p>
              </div>
              <p className="text-gray-700 justify-between flex">
                <p>Discount:</p> <p>-${(total * 5.7 - total).toFixed(2)}</p>
              </p>
              <hr className="w-full mb-2 mt-1 border border-gray-300" />
              <p className="text-gray-900 font-bold justify-between flex">
                <p>Total:</p>
                <p className="px-2">${discountedTotal.toFixed(2)}</p>
              </p>
              <p className="text-gray-700 mt-5 text-sm">
                By completing your purchase you agree to these
                <Link to="/policy" className="text-blue-500 hover:underline"> Terms of Service</Link>.
              </p>
              <button
                onClick={handleProceedForCredit}
                type="submit"
                className="bg-pink-500 hover:bg-pink-700 duration-500 mt-1 text-white font-bold py-4 w-full rounded focus:outline-none focus:shadow-outline"
              >
                Proceed Checkout
              </button>
              <p className="text-gray-700 items-center text-center text-sm mt-1">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
