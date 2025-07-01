import React, { useEffect, useRef, useState } from "react";
import { MdComputer } from "react-icons/md";

function ELearning() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
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
        className="text-gray-800 cursor-pointer font-medium rounded-lg gap-2 font-[Chivo] text-md px-1 py-0 text-center inline-flex items-center hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        <MdComputer size={20} />
        <h1>E-Learning</h1>
      </p>

      <div
        id="dropdownHover"
        className={`absolute top-full -left-10 sm:left-0 z-10 ${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg w-56 sm:shadow sm:w-60`}
      >
        <ul
          className="py-1 text-md text-gray-700 font-[Chivo]"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a
              href="/MyWebsiteDevelopment"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Website Development
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MyFrontend"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Front-End Development
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MyBackend"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Back-End Development
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MyGraphic"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Graphic Designing
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MySocial"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Social Media Marketing
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MySeo"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              SEO
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/MyHR"
              className="block px-4 py-2 hover:bg-blue-400 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              Human Resource
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ELearning;
