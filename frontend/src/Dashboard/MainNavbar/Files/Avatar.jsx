import React, { useEffect, useRef, useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../App/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

function Avatar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  
  const dropdownRef = useRef(null);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

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

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAdmin(data.user.role === "admin");
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.status === 200) {
        dispatch(authActions.logout());
        console.log("Logout successful");
        navigate("/signin");
      } else {
        throw new Error("Unable to logout! Try again");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const confirmLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      handleLogout();
    }
  };

  return (
    <div className="relative mt-2 sm:mt-0" ref={dropdownRef}>
      <p
        id="dropdownHoverButton"
        onClick={openDropdown}
        className="text-gray-600 lg:text-white cursor-pointer font-medium rounded-lg text-lg px-1 py-0 text-center inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <div className="w-full h-full">
          {loading ? (
            <p>Loading...</p>
          ) : user && user.image ? (
            <div className="relative">
              <img
                className="sm:w-10 w-12 sm:h-10 h-12 rounded-full border border-white"
                src={`${import.meta.env.VITE_API_BASE_URL}/route/${user.image}`}
                alt="Profile"
              />
              <span className="bg-green-400 text-white rounded-full px-2 py-2 text-xs absolute top-0 right-0"></span>
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </p>

      {/* Dropdown menu */}
      <div
        id="dropdownHover"
        className={`absolute top-full -right-14 sm:left:28 z-10 ${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-56 lg:w-60 sm:mr-16 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a className="flex gap-3 px-4 py-6">
              <span className="flex text-md flex-col justify-center font-bold">
                {user && (
                  <>
                    <h1>
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </>
                )}
              </span>
            </a>
          </li>
          <hr />
          {isAdmin && (
            <>
              <a href="/dashboard">
                <div className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000">
                  <RxDashboard size={20} />
                  <span>Dashboard</span>
                </div>
              </a>
              <hr />
            </>
          )}
          <li>
            <a
              href="/cart"
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <FaShoppingCart size={20} />
              <div className="flex justify-between gap-20 lg:gap-24">
                <p>My Cart</p>
                <p className="bg-pink-600 text-white rounded-full">
                  {cartItems.length > 0 && (
                    <span className="px-2 py-1 text-xs">{cartItems.length}</span>
                  )}
                </p>
              </div>
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/signup"
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <IoPersonAddSharp size={20} />
              <span>Add another account</span>
            </a>
          </li>
          <hr />
          <li>
            <div
              onClick={confirmLogout}
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <FaPowerOff size={20} />
              <span>Logout</span>
            </div>
          </li>
          <hr />
        </ul>
      </div>
    </div>
  );
}

export default Avatar;
