import React, { useState, useEffect, useRef } from 'react';
import { FiAward } from "react-icons/fi";
import { Link } from 'react-router-dom';

function Career() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <p
        id="dropdownHoverButton"
        onClick={openDropdown}
        className="text-gray-800 cursor-pointer font-medium rounded-lg text-lg px-1 py-0 text-center inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
        type="button"
      >
        <span className='flex items-center gap-2'>
          <FiAward size={20} /> <h1>Career</h1>
        </span>
      </p>

      {/* Dropdown menu */}
      <div
        id="dropdownHover"
        className={`absolute top-full left-0 z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700`}
      >
        <ul className="py-0 text-md text-gray-700 font-[Chivo] dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
            <Link
              to="/MyJobs"
              onClick={closeDropdown}
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Job
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/MyInternships"
              onClick={closeDropdown}
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Internship
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Career;
