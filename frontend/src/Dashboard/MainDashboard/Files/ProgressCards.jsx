import React, { useState, useEffect } from 'react';
import { FaUsers, FaShoppingBag, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const ProgressCards = () => {
  const [counts, setCounts] = useState({
    students: 0,
    rating: 0,
    completion: 0,
    earnings: 0,
  });

  useEffect(() => {
    const animateNumbers = () => {
      const counters = document.querySelectorAll('.count');
      const speed = 200;

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;

          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
    };

    animateNumbers(); // Initial animation

    return () => {
      clearTimeout();
    };
  }, [counts]);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('/route/allUsers', {
          method: 'GET',
          credentials: 'include', // Include credentials for cookies
        });
        const data = await response.json();
        if (response.ok) {
          setCounts((prevCounts) => ({
            ...prevCounts,
            students: data.users.length,
          }));
        } else {
          console.error('Failed to fetch users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();

    const updatedCounts = {
      rating: 0,
      completion: 0,
      earnings: 0, // Update earnings value
    };
    setCounts((prevCounts) => ({ ...prevCounts, ...updatedCounts }));
  }, []);

  return (
    <div className='ml-32 sm:ml-56 '>
      <div className="flex flex-row w-full items-center font-Chivo justify-around py-5 text-base sm:text-xl gap-2">
        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaUsers className="text-blue-500 text-2xl" />
            <h1 className="count text-blue-500" data-target={counts.students}>
              0
            </h1>
            <h5 className="text-xs text-gray-400">MEMBERS ONLINE</h5>
          </p>
        </div>

        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaShoppingBag className="text-blue-500 text-2xl" />
            <h1 className="count text-blue-500" data-target={counts.rating}>
              0
            </h1>
            <h5 className="text-xs text-gray-400">COURSES SOLD</h5>
          </p>
        </div>

        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaCalendarCheck className="text-blue-500 text-2xl" />
            <h1 className="count text-blue-500" data-target={counts.completion}>
              0
            </h1>
            <h5 className="text-xs text-gray-400">THIS WEEK</h5>
          </p>
        </div>

        <div className="space-y-1 bg-white w-2/6 sm:w-1/5 h-28 px-1 sm:px-4 py-4">
          <p className="flex flex-col">
            <FaDollarSign className="text-blue-500 text-2xl" />
            <h1 className="count text-blue-500" data-target={counts.earnings}>
              0
            </h1>
            <h5 className="text-xs text-gray-400">TOTAL EARNINGS</h5>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCards;
