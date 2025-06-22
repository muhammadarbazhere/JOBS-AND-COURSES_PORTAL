import React, { useEffect, useState } from "react";

const TimeCounter = () => {
  const [counts, setCounts] = useState({
    students: 0,
    rating: 0,
    completion: 0,
  });

  useEffect(() => {
    const animateNumbers = () => {
      const speed = 300;

      const counters = document.querySelectorAll(".count");

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
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
    const updatedCounts = { students: 27, rating: 9.8, completion: 86 }; //
    setCounts(updatedCounts);
  }, []);

  return (
    <div className="flex flex-row w-full justify-around py-5 text-3xl sm:text-5xl">
      <div className=" space-y-1">
        <p className="flex flex-row font-bold">
          <h1 className=" count" data-target={counts.students}>
            0
          </h1>
          <span>K+</span>
        </p>
        <h5 className="text-sm sm:text-xl">Students Enrolled</h5>
      </div>

      <div className=" space-y-1">
        <p className="flex flex-row font-bold ">
          <h1 className="count" data-target={counts.rating}>
            0
          </h1>
          <span>+</span>
        </p>
        <h5 className="text-sm sm:text-xl">Average Rating</h5>
      </div>

      <div className="space-y-1">
        <p className="flex flex-row font-bold ">
          <h1 className="count" data-target={counts.completion}>
            0
          </h1>
          <span>%</span>
        </p>
        <h5 className="text-sm sm:text-xl">Completion Rate</h5>
      </div>
    </div>
  );
};

export default TimeCounter;
