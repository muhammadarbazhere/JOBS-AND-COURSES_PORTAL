import React, { useEffect, useRef, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <p
        id="dropdownHoverButton"
        className="text-gray-800 cursor-pointer font-medium rounded-lg text-lg px-1 my-0 py-0 text-center inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
        type="button"
        onClick={toggleDropdown}
      >
        <MdDashboardCustomize size={20} className="" />
        <span>Dashboard</span>
      </p>

      {/* Dropdown menu */}
      <div
        id="dropdownHover"
        className={`absolute top-full left-0 z-10 ${
          isDropdownOpen ? "" : "hidden"
        } divide-y divide-gray-100 bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
      >
        <ul
          className="py-1 text-md text-gray-700 font-[Chivo] dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              to="/MyAddJobs"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Add Job/Internship
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/MyAddCourse"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Add New Course
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/MyJobsList"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Jobs /Internship List
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/MyCourseList"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Courses List
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
