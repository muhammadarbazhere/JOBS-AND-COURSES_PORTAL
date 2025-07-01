import React, { useEffect, useState } from 'react';
import { FaUsers, FaShoppingBag, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ProgressCards = () => {
  const [counts, setCounts] = useState({
    students: 0,
    coursesSold: 0,
    thisWeek: 0,
    earnings: 0,
  });

  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      // Fetch Users
      const userRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/allUsers`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Auth header
        },
      });
      const userData = await userRes.json();

      // Fetch Orders or Earnings (if available in your backend)
      const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/cart/getCartData`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const orderData = await orderRes.json();

      setCounts({
        students: userData.users?.length || 0,
        coursesSold: orderData.cartItems?.length || 10, // Replace 10 with real data if you have
        thisWeek: 5, // Example static
        earnings: orderData.totalAmount || 500, // Example, adjust based on backend
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // ✅ Animate numbers the React way
  const AnimatedNumber = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = target;
      if (start === end) return;

      const incrementTime = 20;
      const increment = Math.ceil(end / 100);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, incrementTime);

      return () => clearInterval(timer);
    }, [target]);

    return <h1 className="text-blue-500">{count}</h1>;
  };

  return (
    <div className="ml-32 sm:ml-56">
      <div className="flex flex-row w-full items-center font-Chivo justify-around py-5 text-base sm:text-xl gap-2">
        
        {/* Members */}
        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaUsers className="text-blue-500 text-2xl" />
            <AnimatedNumber target={counts.students} />
            <h5 className="text-xs text-gray-400">MEMBERS ONLINE</h5>
          </p>
        </div>

        {/* Courses Sold */}
        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaShoppingBag className="text-blue-500 text-2xl" />
            <AnimatedNumber target={counts.coursesSold} />
            <h5 className="text-xs text-gray-400">COURSES SOLD</h5>
          </p>
        </div>

        {/* This Week */}
        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaCalendarCheck className="text-blue-500 text-2xl" />
            <AnimatedNumber target={counts.thisWeek} />
            <h5 className="text-xs text-gray-400">THIS WEEK</h5>
          </p>
        </div>

        {/* Earnings */}
        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaDollarSign className="text-blue-500 text-2xl" />
            <AnimatedNumber target={counts.earnings} />
            <h5 className="text-xs text-gray-400">TOTAL EARNINGS</h5>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProgressCards;
