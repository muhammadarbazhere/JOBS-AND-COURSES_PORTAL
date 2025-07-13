import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import PolicyIcon from "@mui/icons-material/Policy";

import { SiGooglemaps } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { GrUserAdmin } from "react-icons/gr";
import { FaHome } from "react-icons/fa"; // ✅ Added FaUserCircle for Profile
import { FiSettings } from "react-icons/fi"; // ✅ Settings icon

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../App/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

import OrderSummary from "./Files/OrderSummary";
import Report from "./Files/Report";
import TaskProgress from "./Files/TaskProgress";
import ProgressCards from "./Files/ProgressCards";
import AllUsers from "./Files/AllUsers";
import AllAdmins from "./Files/AllAdmins";

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllAdmins, setShowAllAdmins] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) sendRequest();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(authActions.logout());
        navigate("/signin");
      } else throw new Error("Unable to logout! Try again");
    } catch (err) {
      console.error(err.message);
    }
  };

  const confirmLogout = () => {
    const isConfirmed = window.confirm("Dear Admin! Are you sure you want to sign out?");
    if (isConfirmed) handleLogout();
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavLinkClick = (nav) => {
    setActiveNavLink(nav);
    setShowAllUsers(nav === "users");
    setShowAllAdmins(nav === "admins");
    setMobileOpen(false);
  };

  const renderSidebar = () => (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 text-center border-b border-gray-800">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">COOL ADMIN</h1>
      </div>

      {/* Profile Section */}
      <div className="p-4 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : user && user.image ? (
          <img
            className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500"
            src={`${import.meta.env.VITE_API_BASE_URL}/route/${user.image}`}
            alt="Profile"
          />
        ) : (
          <p>No User</p>
        )}
        <h1 className="mt-2 font-bold">{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h1>
        <button
          onClick={confirmLogout}
          className="mt-2 bg-gradient-to-r from-red-500 to-red-700 px-4 py-1 rounded hover:scale-105 transition-transform"
        >
          Sign out
        </button>
      </div>

      {/* Nav Links */}
      <List className="flex-1">
        {/* Home */}
        <ListItem
          button
          onClick={() => handleNavLinkClick("home")}
          className={`rounded-lg my-1 ${
            activeNavLink === "home" ? "bg-blue-700/50" : "hover:bg-blue-700/30"
          }`}
        >
          <ListItemIcon><FaHome size={20} className="text-blue-400 drop-shadow-lg" /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>


        {/* Admins */}
        <ListItem
          button
          onClick={() => handleNavLinkClick("admins")}
          className={`rounded-lg my-1 ${
            activeNavLink === "admins" ? "bg-purple-700/50" : "hover:bg-purple-700/30"
          }`}
        >
          <ListItemIcon><GrUserAdmin size={20} className="text-purple-400 drop-shadow-lg" /></ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>

        {/* Users */}
        <ListItem
          button
          onClick={() => handleNavLinkClick("users")}
          className={`rounded-lg my-1 ${
            activeNavLink === "users" ? "bg-green-700/50" : "hover:bg-green-700/30"
          }`}
        >
          <ListItemIcon><HiUsers size={20} className="text-green-400 drop-shadow-lg" /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        {/* Policy */}
        <Link to="/policy">
          <ListItem
            button
            onClick={() => handleNavLinkClick("policy")}
            className={`rounded-lg my-1 ${
              activeNavLink === "policy" ? "bg-teal-700/50" : "hover:bg-teal-700/30"
            }`}
          >
            <ListItemIcon><PolicyIcon className="text-teal-400 drop-shadow-lg" /></ListItemIcon>
            <ListItemText primary="Policy" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row bg-gray-950 min-h-screen">
      <AppBar position="fixed" className="z-50">
        <Toolbar className="bg-gray-900">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className="sm:hidden"
          >
            <MenuIcon />
          </IconButton>
          <div className="flex-grow" />
          <IconButton color="inherit"><SearchIcon /></IconButton>
          <IconButton color="inherit"><NotificationsIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" className="hidden sm:block" open>
        {renderSidebar()}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        className="sm:hidden"
      >
        {renderSidebar()}
      </Drawer>

      <main
        className={`flex-1 bg-gray-950 text-gray-100 min-h-screen pt-[64px] sm:ml-64 p-2`}
      >
        {showAllUsers ? (
          <>
            {/* <OrderSummary /> */}
            <AllUsers />
          </>
        ) : showAllAdmins ? (
          <>
            {/* <OrderSummary /> */}
            <AllAdmins />
          </>
        ) : (
          <>
            <OrderSummary />
            <div className="pr-0 sm:pr-2">
              <ProgressCards />
            </div>
            <div className="py-4 flex flex-col lg:flex-row gap-4">
              <Report />
              <TaskProgress />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
