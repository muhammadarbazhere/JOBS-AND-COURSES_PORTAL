import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component mounts
  }, []);

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await fetch("/route/cart/getUserCart", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary headers, such as Authorization if needed
          // "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();

      // Map each item in the cart to the format expected by your component
      const formattedCart = data.map((item) => ({
        _id: item.course._id,
        title: item.course.title,
        description: item.course.description,
        charges: item.course.charges,
        author: item.course.author,
        duration: item.course.duration,
        image: item.course.image,
      }));

      setCart(formattedCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Function to handle removal of a course from the cart
  const handleRemoveFromCart = async (courseId) => {
    try {
      const response = await fetch(
        `/route/cart/deleteCart/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove course from cart.");
      }

      // Filter out the removed course from the cart state
      const updatedCart = cart.filter((course) => course._id !== courseId);
      setCart(updatedCart);

      toast.success("Course removed from cart!");
    } catch (error) {
      console.error("Error removing course from cart:", error.message);
      toast.error(
        "Failed to remove course from cart. Please try again later."
      );
    }
  };

  // Function to handle applying a coupon code
  const handleApplyCoupon = () => {
    if (coupon === "arbaz") {
      setError("");
      setDiscount(0.1); // 10% discount
      setCoupon("");
    } else {
      setError("The coupon code entered is not valid for this course.");
      setDiscount(0); // No discount
      setCoupon("");
    }
  };

  // Calculate total amounts
  const total = cart.reduce((acc, course) => acc + course.charges, 0);
  const discountedTotal = total - total * discount;
  const originalTotal = total * 5.7;
  const discountPercentage = (1 - discountedTotal / originalTotal) * 100;

  // Function to handle checkout
  const handleCheckout = () => {
    navigate("/checkout", { state: { discount } });
  };

  return (
    <div className="bg-blue-100 pb-10">
      <div className="font-[Chivo] py-10 px-4 lg:px-6 xl:px-20">
        <div className="w-full space-y-1 mb-2 flex flex-col items-start md:px-2">
          <p className="font-[Chivo] text-md mb-4 font-bold sm:text-3xl text-[#272727]">
            Shopping Cart
          </p>
          {cart.length > 0 &&
            <h1 className="mb-2 font-bold sm:text-lg text-[#272727]">
            {cart.length} {cart.length === 1 ? "course" : "courses"} in Cart
          </h1>
          }
        </div>

        {cart.length === 0 ? (
          <div className="flex justify-center h-full flex-col items-center">
            <p className="text-lg text-center pt-12 text-gray-700 font-bold mb-4">
              Your cart is empty. Keep shopping to find a course!
            </p>
            <a
              href="/learning"
              className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-800 duration-1000"
            >
              Keep Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start">
            <div className="lg:w-3/4">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="w-full mb-6 bg-white border-2 border-gray-200 rounded-md shadow-lg overflow-hidden flex flex-col sm:flex-row"
                >
                  <img
                    src={`/route/${course.image}`}
                    className="w-full sm:w-40 h-40 object-cover"
                    alt={course.title}
                  />
                  <div className="px-4 py-2 flex-grow">
                    <p className="flex flex-row justify-between">
                      <h2 className="font-bold text-base sm:text-xl mb-2">
                        {course.title}
                      </h2>
                      <p className="flex flex-row gap-12 px-1 items-center justify-center">
                        <div className="flex space-x-2 hidden md:block">
                          <button
                            onClick={() => handleRemoveFromCart(course._id)}
                            className="text-pink-600 hover:text-pink-800 flex items-center"
                          >
                            <FaRegTrashAlt className="mr-1" />
                            Remove
                          </button>
                        </div>
                        <p className="text-pink-600 font-semibold text-base sm:text-lg mb-1">
                          ${course.charges}
                        </p>
                      </p>
                    </p>
                    <div className="flex justify-between ">
                      <p className="text-gray-600 mb-1">By {course.author}</p>
                      <span>
                        <p className="text-black line-through opacity-75 font-semibold text-base sm:text-lg mb-1">
                          ${(course.charges * 5.7).toFixed(2)}
                        </p>
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1">{course.description}</p>
                    <p className="flex justify-between">
                      <p className="text-gray-700 font-semibold text-lg mb-1">
                        {course.duration}
                      </p>
                      <div className="flex space-x-2 block md:hidden">
                        <button
                          onClick={() => handleRemoveFromCart(course._id)}
                          className="text-pink-600 hover:text-pink-800 flex items-center"
                        >
                          <FaRegTrashAlt className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/4 mb-6 bg-white p-4 border-2 border-gray-200 rounded-md shadow-lg mt-6 lg:mt-0">
              <h2 className="font-bold flex flex-col">
                <span className="text-lg text-gray-600">Total:</span>
                <span className="text-black opacity-70 text-3xl">
                  ${discountedTotal.toFixed(2)}
                </span>
              </h2>
              <p className="text-gray-600 line-through">
                ${originalTotal.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-2">
                {discountPercentage.toFixed(2)}% off
              </p>
              <button
                onClick={handleCheckout}
                className="bg-pink-600 text-white w-full py-2 rounded-md hover:bg-pink-700 duration-200 mb-2"
              >
                Checkout
              </button>
              {discount > 0 && (
                <p className="text-green-600 mb-4">
                  You saved ${(total * discount).toFixed(2)} with the coupon!
                </p>
              )}

              <h2 className="font-bold text-lg text-gray-600 mb-2 mt-3">
                Promotions
              </h2>
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-pink-600 text-white px-3 rounded-md hover:bg-pink-700 duration-300"
                >
                  Apply
                </button>
              </div>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              <ToastContainer />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Cart;
