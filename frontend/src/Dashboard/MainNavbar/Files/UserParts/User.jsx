import React, { useState } from "react";
import { MdDashboardCustomize, MdPerson } from "react-icons/md";

function User() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className=" relative "
  
    >

      <p
    
        id="dropdownHoverButton"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        className="text-gray-800 cursor-pointer font-medium rounded-lg gap-2  font-[Chivo] text-md px-1 py-0 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
        type="button"
      >
        <MdPerson size={20} />
        <h1>User</h1>
      </p>

      {/* Dropdown menu */}
      <div
        id="dropdownHover"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        className={`absolute top-full right-0  z-10 ${
          isDropdownOpen ? "" : "hidden"
        }  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-1 text-md text-gray-700 font-[Chivo] dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a
              href="MyLogin"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
           Login
            </a>
          </li>
          <hr />
          <li>
            <a
              href="MyRegister"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
             Register
            </a>
          </li>
          <hr />
          <li>
            <a
              href="MyForgetPassword"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Forget Password
            </a>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default User;
