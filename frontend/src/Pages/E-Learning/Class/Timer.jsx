import React, { useState, useEffect } from "react";

function Timer() {
  const [days, setDays] = useState(
    parseInt(localStorage.getItem("timerDays")) || 3
  );
  const [hours, setHours] = useState(
    parseInt(localStorage.getItem("timerHours")) || 5
  );
  const [minutes, setMinutes] = useState(
    parseInt(localStorage.getItem("timerMinutes")) || 0
  );
  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem("timerSeconds")) || 0
  );

  useEffect(() => {
    const handleTimer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (days > 0) {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            } else {
              // Reset the timer after it completes
              setDays(3);
              setHours(5);
              setMinutes(0);
              setSeconds(0);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(handleTimer);
  }, [days, hours, minutes, seconds]);

  // Update localStorage on every state change
  useEffect(() => {
    localStorage.setItem("timerDays", days);
    localStorage.setItem("timerHours", hours);
    localStorage.setItem("timerMinutes", minutes);
    localStorage.setItem("timerSeconds", seconds);
  }, [days, hours, minutes, seconds]);

  return (
    <div className="flex items-center space-x-1 sm:space-x-0 md:space-x-4 mt-3 justify-evenly w-full md:w-4/5 overflow-hidden">
      <div className="border-t-2 border-l-2 border-r-4 border-b-4 border-[#575EB3] bg-white w-1/4 sm:w-1/5 py-3 md:w-1/4 text-center text-[#575EB3] font-bold text-lg sm:text-5xl md:font-semibold">
        <span>
          {" "}
          {days < 10 ? `0${days}` : days} <br />{" "}
          <h1 className="text-sm sm:text-xl font-bold font-[Comfortaa] text-black">
            Days{" "}
          </h1>
        </span>
      </div>

      <div className="border-t-2 border-l-2 border-r-4 border-b-4 border-[#575EB3] bg-white w-1/4 sm:w-1/5 py-3 md:w-1/4 text-[#575EB3] font-bold sm:text-5xl md:font-semibold text-lg text-center">
        <span>
          {hours < 10 ? `0${hours}` : hours} <br />{" "}
          <h1 className="text-sm sm:text-xl font-bold font-[Comfortaa] text-black">
            Hours
          </h1>{" "}
        </span>
      </div>

      <div className="border-t-2 border-l-2 border-r-4 border-b-4 border-[#575EB3] bg-white w-1/4 sm:w-1/5 py-3 md:w-1/4 text-center text-[#575EB3] font-bold sm:text-5xl md:font-semibold text-lg">
        <span>
          {" "}
          {minutes < 10 ? `0${minutes}` : minutes} <br />
          <h1 className="text-sm sm:text-xl font-bold font-[Comfortaa] text-black">
            {" "}
            Minutes{" "}
          </h1>
        </span>
      </div>

      <div className="border-t-2 border-l-2 border-r-4 border-b-4 border-[#575EB3] bg-white w-1/4 sm:w-1/5 py-3 md:w-1/4 text-center text-[#575EB3] font-bold sm:text-5xl md:font-semibold text-lg">
        <span>
          {" "}
          {seconds < 10 ? `0${seconds}` : seconds} <br />{" "}
          <h1 className="text-sm sm:text-xl font-bold font-[Comfortaa] text-black">
            Seconds{" "}
          </h1>
        </span>
      </div>
    </div>
  );
}

export default Timer;
