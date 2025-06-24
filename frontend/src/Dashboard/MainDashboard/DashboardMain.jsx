import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { SiGooglemaps } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { GrUserAdmin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink, useNavigate } from "react-router-dom";

import PolicyIcon from "@mui/icons-material/Policy";
import OrderSummary from "./Files/OrderSummary";
import Report from "./Files/Report";
import TaskProgress from "./Files/TaskProgress";
import UserData from "./Files/UserData";
import ProgressCards from "./Files/ProgressCards";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../App/AuthSlice";

import AllUsers from "./Files/AllUsers";
import AllAdmins from './Files/AllAdmins';

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllAdmins, setShowAllAdmins] = useState(false); // State to manage visibility of AllAdmins
  const [activeNavLink, setActiveNavLink] = useState("home"); // State to manage active NavLink

  const sendRequest = async () => {
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
      sendRequest();
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const isConfirmed = window.confirm("Dear Admin! Are you sure you want to sign out?");
    if (isConfirmed) {
      handleLogout();
    }
  };

  const handleShowAllUsers = () => {
    setShowAllUsers(true);
    setShowAllAdmins(false); // Hide AllAdmins when showing AllUsers
    setActiveNavLink("users");
  };

  const handleShowAllAdmins = () => {
    setShowAllAdmins(true);
    setShowAllUsers(false); // Hide AllUsers when showing AllAdmins
    setActiveNavLink("admins");
  };

  const handleShowHome = () => {
    setShowAllUsers(false);
    setShowAllAdmins(false);
    setActiveNavLink("home");
  };
  const handleShowMaps = () => {
    setShowAllUsers(false);
    setShowAllAdmins(false);
    setActiveNavLink("maps");
  };

  const handleShowPolicy = () => {
    setShowAllUsers(false);
    setShowAllAdmins(false);
    setActiveNavLink("policy");
  };

  return (
    // h-dvh
    <div className="flex bg-blue-100 h-full "> 
      <AppBar position="fixed" className="bg-black z-10" style={{ zIndex: 12 }}>
        <Toolbar className="bg-blue-500">
          <div style={{ flexGrow: 3 }} />

          <IconButton color="inherit" edge="end">
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit" aria-label="notifications" edge="end">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <aside className="fixed z-30 top-0 left-0 w-40 sm:w-72 h-full bg-green-300 ">
        <div className="bg-blue-600 h-16 flex items-center justify-center">
          <h2 className="text-sm sm:text-xl font-bold text-white">COOL ADMIN</h2>
        </div>

        <nav className="mt-6">
          <div className="w-full flex flex-col items-center">
            {loading ? (
              <p>Loading...</p>
            ) : user && user.image ? (
              <img
                className="sm:w-28 w-10 border-2 border-white h-10 sm:h-28 rounded-full"
                src={`/route/${user.image}`}
                alt="Profile"
              />
            ) : (
              <p className="text-gray-500">No User Logged in</p>
            )}

            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <h1 className="mt-2 text-base items-center text-center font-bold break-words">
                {user.firstName} {user.lastName}
              </h1>
            ) : (
              <p className="text-gray-500">No User Found</p>
            )}

            <button onClick={confirmLogout} className="text-xs mt-2 mb-3 cursor-pointer py-1 px-2 bg-teal-700 text-white rounded-md
            shadow-md hover:bg-teal-800 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out
            ">
              Sign out
            </button>
          </div>
          <hr className="my-2" />

          <NavLink
            className={`flex items-center sm:py-2 py-1 sm:px-6 px-2 text-base hover:bg-gray-300 hover:text-black hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out ${
              activeNavLink === "home" ? " bg-blue-500 text-white" : ""
            }`} 
            onClick={handleShowHome}
          >
            <FaHome size={30} />
            <span className="px-2">Home</span>
          </NavLink>

          <hr className="my-2" />

          <NavLink
            className={`flex items-center sm:py-2 py-1 sm:px-6 px-2 text-base hover:bg-gray-300 hover:text-black hover:transform hover:-translate-y-1 transition-all duration-300 ${
              activeNavLink === "admins" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleShowAllAdmins} // Show AllAdmins when Admin is clicked
          >
            <GrUserAdmin size={30} />
            <span className="px-2">Admin</span>
          </NavLink>
          <hr className="my-2" />

          <NavLink
            className={`flex items-center sm:py-2 py-1 sm:px-6 px-2 text-base hover:bg-gray-300 hover:text-black hover:transform hover:-translate-y-1 transition-all duration-300 ${
              activeNavLink === "users" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleShowAllUsers} // Show AllUsers when Users is clicked
          >
            <HiUsers size={30} />
            <span className="px-2">Users</span>
          </NavLink>
          <hr className="my-2" />

          <NavLink
            className={`flex items-center sm:py-2 py-1 sm:px-6 px-2 text-base hover:bg-gray-300 hover:text-black hover:transform hover:-translate-y-1 transition-all duration-300 ${
              activeNavLink === "maps" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleShowMaps}
          >
            <SiGooglemaps size={30} />
            <span className="px-2">Maps</span>
          </NavLink>
          <hr className="my-2" />
          <NavLink
            className={`flex items-center sm:py-2 py-1 sm:px-6 px-2 text-base hover:bg-gray-300 hover:text-black hover:transform hover:-translate-y-1 transition-all duration-300 ${
              activeNavLink === "policy" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleShowPolicy}
          >
            <PolicyIcon size={30} />
            <span className="px-2">Policy</span>
          </NavLink>
          <hr className="my-2" />
        </nav>
      </aside>

      <div className="flex-grow ml-16 mt-16 p-0 bg-blue-100">
        {showAllUsers ? (
          <>
            <OrderSummary />
            <AllUsers />
          </>
        ) : showAllAdmins ? (
          <>
            <OrderSummary />
            <AllAdmins />
          </>
        ) : (
          <>
            <OrderSummary />
            <div className="pr-2">
              <ProgressCards />
            </div>

            <div className="py-4 sm:px-6 justify-end sm:justify-evenly flex gap-2 sm:gap-4 ml-12 sm:ml-56 bg-blue-100">
              <Report />
              <TaskProgress />
            </div>

            <UserData />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
