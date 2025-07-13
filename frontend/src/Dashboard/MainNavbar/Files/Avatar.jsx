import React, { useEffect, useRef, useState } from "react";
// import { FaPowerOff, FaShoppingCart } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6"; // ✅ PowerOff is from fa6
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // ✅ ShoppingCart is from fa

import { IoPersonAddSharp } from "react-icons/io5";
import { MdLockReset } from "react-icons/md"; // ✅ Correct Forgot Password icon
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../App/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

function Avatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const dropdownRef = useRef(null);

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch user
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAdmin(data.user.role === "admin");
      }
    } catch (error) {
      console.error("User fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Cart
  const fetchCartItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/getUserCart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cart || []);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
      fetchCartItems();
    }
  }, [isLoggedIn]);

  // ✅ Logout
  const handleLogout = async () => {
    setIsDropdownOpen(false); // ✅ Close dropdown before logout
    if (!token) {
      dispatch(authActions.logout());
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        dispatch(authActions.logout());
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const confirmLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      handleLogout();
    }
  };

  // ✅ Auto close on any link click
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <div className="relative mt-2 sm:mt-0" ref={dropdownRef}>
      <p
        id="dropdownHoverButton"
        onClick={openDropdown}
        className="text-gray-600 lg:text-white cursor-pointer font-medium rounded-lg text-lg px-1 py-0 text-center inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <div className="w-full h-full">
          {loading ? (
            <p>Loading...</p>
          ) : user && user.image ? (
            <div className="relative">
              <img
                className="sm:w-10 w-12 sm:h-10 h-12 rounded-full border border-white"
                src={`${import.meta.env.VITE_API_BASE_URL}/route/${user.image}`}
                alt="User Avatar"
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
            <div className="flex gap-3 px-4 py-6">
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
            </div>
          </li>
          <hr />
          {isAdmin && (
            <>
              <Link
                to="/dashboard"
                onClick={closeDropdown}
              >
                <div className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000">
                  <RxDashboard size={20} />
                  <span>Dashboard</span>
                </div>
              </Link>
              <hr />
            </>
          )}
          <li>
            <Link
              to="/cart"
              onClick={closeDropdown}
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <FaShoppingCart size={20} />
              <div className="flex justify-between gap-20 lg:gap-24">
                <p>My Cart</p>
                <p className="bg-pink-600 text-white rounded-full">
                  {cartItems?.length > 0 && (
                    <span className="px-2 py-1 text-xs">{cartItems.length}</span>
                  )}
                </p>
              </div>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/profile"
              onClick={closeDropdown}
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <FaUserCircle size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/forgot"
              onClick={closeDropdown}
              className="flex gap-3 cursor-pointer px-4 py-4 hover:bg-[#4272D7] hover:text-white duration-1000"
            >
              <MdLockReset size={20} /> {/* ✅ Correct icon */}
              <span>Reset Password</span>
            </Link>
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
