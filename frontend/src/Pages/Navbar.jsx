import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TiThMenu, TiTimes } from "react-icons/ti"; 
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import Avatar from "../Dashboard/MainNavbar/Files/Avatar";
import { useSelector } from "react-redux";

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState("home"); 
  const location = useLocation();
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/route/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data:", data);

        if (data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  // Function to handle active NavLink change
  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    closeDrawer();
  };

  const handleCart = () => {
    setActiveNavLink('cart')
     navigate('/cart')
 
  };
  const handleLogoClicked = () => {
    setTimeout(() => {
      window.location.href = '/'; 
    }, ); 
  };

  return (
    <nav className="bg-blue-100 sticky top-0 z-50 text-[#374151] border-gray-200 dark:bg-gray-900">
      <div className="w-full xl:px-24 flex flex-wrap flex-row md:flex-row md:items-center items-start justify-between text-[#374151] mx-0 lg:mx-0 px-2">
        <div className="flex items-center">
          <NavLink
          onClick={handleLogoClicked}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-16 w-16" alt="Arbaz WebCraft" />
          </NavLink>
          {!isLoggedIn && (
            <h1 className="font-bold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-3xl sm:text-2xl xl:text-3xl">
              Arbaz WebCraft
            </h1>
          )}
        </div>

        {isLoggedIn && (
          <div className="hidden md:hidden lg:flex lg:items-center lg:space-x-3 lg:rtl:space-x-reverse font-[Chivo]">
            <NavLink
              onClick={() => handleNavLinkClick("home")}
              to="/"
              className={`hover:underline ${
                activeNavLink === "home" ? "text-blue-500" : ""
              }`}
            >
              HOME
            </NavLink>
            <span className="px-2"></span>
            <NavLink
              onClick={() => handleNavLinkClick("remoteJobs")}
              to="remoteJobs"
              className={`hover:underline ${
                activeNavLink === "remoteJobs" ? "text-blue-500" : ""
              }`}
            >
              REMOTE JOBS
            </NavLink>
            <span className="px-2"></span>
            <NavLink
              onClick={() => handleNavLinkClick("outSourcing")}
              to="outSourcing"
              className={`hover:underline ${
                activeNavLink === "outSourcing" ? "text-blue-500" : ""
              }`}
            >
              BUSINESS OUTSOURCING
            </NavLink>
            <span className="px-2"></span>
            <NavLink
              onClick={() => handleNavLinkClick("learning")}
              to="learning"
              className={`hover:underline ${
                activeNavLink === "learning" ? "text-blue-500" : ""
              }`}
            >
              E-LEARNING
            </NavLink>
            <span className="px-2"></span>
            <NavLink
              onClick={() => handleNavLinkClick("about")}
              to="about"
              className={`hover:underline ${
                activeNavLink === "about" ? "text-blue-500" : ""
              }`}
            >
              ABOUT US
            </NavLink>
            <span className="px-2"></span>
            {isAdmin && (
              <NavLink
                onClick={() => handleNavLinkClick("MyAdmin")}
                to="MyAdmin"
                className={`hover:underline ${
                  activeNavLink === "MyAdmin" ? "text-blue-500" : ""
                }`}
              >
                ADMIN
              </NavLink>
            )}
            <span className="px-2"></span>
          </div>
        )}
        <div className="flex flex-row sm:flex-row md:flex-row items-center md:order-3 space-x-3 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
               <FaShoppingCart
                onClick={handleCart}
                size={24}
                
                className={`text-[#374151] cursor-pointer relative ${
                  activeNavLink === "cart" ? "text-blue-500" : ""
                }`}
              />
              {cartItems.length > 0 && (
                <span className="bg-pink-600 text-white rounded-full px-2 py-1 text-xs absolute top-1 t xl:right-44 md:right-32 lg:right-20">
                  {cartItems.length}
                </span>
              )}
            
              <Avatar />
            </>
          ) : (
            <div className=" px-2 sm:px-0 mt-5 sm:mt-0 ">
              {location.pathname === "/signin" && (
                <NavLink
                  onClick={() => handleNavLinkClick("signup")}
                  to="/signup"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-8 sm:mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </NavLink>
              )}
              {location.pathname === "/signup" && (
                <NavLink
                  onClick={() => handleNavLinkClick("signin")}
                  to="/signin"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-3 sm:mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Signin
                </NavLink>
              )}
            </div>
          )}
          {isLoggedIn && (
            <button
              type="button"
              onClick={toggleDrawer}
              className="lg:hidden text-[#374151] m-2 p-1 rounded-md border-2 border-gray-400"
            >
              {isDrawerOpen ? <TiTimes size={30} /> : <TiThMenu size={30} />}
            </button>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <div
          className={`${
            isDrawerOpen ? "block" : "hidden"
          } block lg:hidden font-[Chivo] transition-all duration-1000 ease-in-out`}
        >
          <div className="px-1">
            <NavLink
              onClick={() => handleNavLinkClick("home")}
              to="/"
              className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                activeNavLink === "home" ? "bg-teal-800" : ""
              }`}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("remoteJobs")}
              to="remoteJobs"
              className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                activeNavLink === "remoteJobs" ? "bg-teal-800" : ""
              }`}
            >
              REMOTE JOBS
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("outSourcing")}
              to="outSourcing"
              className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                activeNavLink === "outSourcing" ? "bg-teal-800" : ""
              }`}
            >
              BUSINESS OUTSOURCING
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("learning")}
              to="learning"
              className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                activeNavLink === "learning" ? "bg-teal-800" : ""
              }`}
            >
              E-LEARNING
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("about")}
              to="about"
              className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                activeNavLink === "about" ? "bg-teal-800" : ""
              }`}
            >
              ABOUT US
            </NavLink>
            {isAdmin && (
              <NavLink
                onClick={() => handleNavLinkClick("MyAdmin")}
                to="MyAdmin"
                className={`block bg-blue-600 px-4 py-3 mb-1 rounded-lg text-md text-white dark:text-gray-200 hover:bg-black ${
                  activeNavLink === "MyAdmin" ? "bg-teal-800" : ""
                }`}
              >
                ADMIN
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
