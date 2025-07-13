import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Learning from "./Pages/E-Learning/learning";
import EnrollNow from "./Pages/Enroll/EnrollNow";
import Enrollmentform from "./Pages/Enroll/Enrollmentform";
import JobApplyForm from "./Pages/Enroll/JobApplyForm";

import Navbar from "./Pages/Navbar";
import DashboardMain from "./Dashboard/MainDashboard/DashboardMain";
import Profile from "./Dashboard/MainNavbar/Files/UserParts/Files/Profile";

import CourseList from "./Dashboard/MainNavbar/Files/DashboardParts/Course/CourseList";
import AddCourse from "./Dashboard/MainNavbar/Files/DashboardParts/Course/AddCourse";
import AddJobs from "./Dashboard/MainNavbar/Files/DashboardParts/Job/AddJobs";
import JobsList from "./Dashboard/MainNavbar/Files/DashboardParts/Job/JobsList";
import WebsiteDevelopment from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/WebsiteDevelopment";
import Frontend from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/Frontend";
import Backend from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/Backend";
import Graphic from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/Graphic";
import SocialMedia from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/SocialMedia";
import Seo from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/Seo";
import HumanResource from "./Dashboard/MainNavbar/Files/ELearningParts/Categories/HumanResource";
import Jobs from "./Dashboard/MainNavbar/Files/CareerParts/Jobs";
import Internship from "./Dashboard/MainNavbar/Files/CareerParts/Internship";

import Forgot from "./Dashboard/MainNavbar/Files/UserParts/Files/Forget";


import Footer from "./Pages/Footer/Footer";
import EditCourse from "./Components/CoursesFiles/EditCourse";
import Courses from "./Components/CoursesFiles/CoursesList";
import AdminPanel from "./Pages/Admin/AdminPanel";
import EditJobs from "./Components/JobsInternships/EditJobsInternship";
import RemoteJobs from "./Pages/RemoteJobs/RemoteJobs";
import MixJobInternships from "./Components/JobsInternships/MixJobInternships";

import Signup from "./AuthComponents/Signup";
import { useSelector } from "react-redux";
import Login from "./AuthComponents/Login";
import Welcome from "./Pages/Admin/Welcome";

import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Policy from './Pages/Policy'
import Contact from './Pages/Contact'
import OrderSuccess from "./Pages/OrderSuccess";
import NotFound from "./NotFound";

import Outsourcing from "./Pages/Business/OutSourcing";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const isNotFoundPage = location.pathname === "*";

  const showFooter =
    isLoggedIn &&
     !location.pathname.startsWith("/dashboard") && // 👈 Hide footer for all /dashboard routes
    !isNotFoundPage &&
    !location.pathname.startsWith("/My") &&
    !location.pathname.startsWith("/apply/") &&
    !location.pathname.startsWith("/checkout") &&
    !location.pathname.startsWith("/signup") &&
    !location.pathname.startsWith("/signin") &&
    !location.pathname.startsWith("/policy") &&
    !location.pathname.startsWith("/cart") &&
    !location.pathname.startsWith("/forgot") &&
    !location.pathname.startsWith("/profile");

  const showNavbar =
    !isNotFoundPage &&
      !location.pathname.startsWith("/dashboard") && // 👈 Hide navbar for all /dashboard routes
    !location.pathname.startsWith("/checkout") &&
    !location.pathname.startsWith("/policy") &&
    !location.pathname.startsWith("/forgot");
    
  return (
    <>
      {showNavbar && <Navbar />}
      {location.pathname.startsWith("/My") && isLoggedIn && <AdminPanel />}

      <Routes>
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardMain /> : <Navigate to="/signin" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/signin" />}
        />
        <Route
          path="/learning"
          element={isLoggedIn ? <Learning /> : <Navigate to="/signin" />}
        />
        <Route
          path="/enroll"
          element={isLoggedIn ? <EnrollNow /> : <Navigate to="/signin" />}
        />
        <Route
          path="/form"
          element={isLoggedIn ? <Enrollmentform /> : <Navigate to="/signin" />}
        />
        <Route
          path="/apply/:id"
          element={isLoggedIn ? <JobApplyForm /> : <Navigate to="/signin" />}
        />
        <Route
          path="/Jobs"
          element={isLoggedIn ? <RemoteJobs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/JobsInternships"
          element={isLoggedIn ? <MixJobInternships /> : <Navigate to="/signin" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/signin" />}
        />
        <Route
          path="/outsourcing"
          element={isLoggedIn ? <Outsourcing /> : <Navigate to="/signin" />}
        />
         <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />}
        />

        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/policy" element={<Policy />} />
         <Route path="/contact" element={<Contact />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Admin routes */}
        <Route
          path="/MyAdmin"
          element={isLoggedIn ? <Welcome /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyAddCourse"
          element={isLoggedIn ? <AddCourse /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyCourseList"
          element={isLoggedIn ? <CourseList /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyAddJobs"
          element={isLoggedIn ? <AddJobs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyJobsList"
          element={isLoggedIn ? <JobsList /> : <Navigate to="/signin" />}
        />
        <Route
          path="/courses"
          element={isLoggedIn ? <Courses /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyEdit/:id"
          element={isLoggedIn ? <EditCourse /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyeditJobs/:id"
          element={isLoggedIn ? <EditJobs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyWebsiteDevelopment"
          element={isLoggedIn ? <WebsiteDevelopment /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyFrontend"
          element={isLoggedIn ? <Frontend /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyBackend"
          element={isLoggedIn ? <Backend /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyGraphic"
          element={isLoggedIn ? <Graphic /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MySocial"
          element={isLoggedIn ? <SocialMedia /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MySeo"
          element={isLoggedIn ? <Seo /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyHR"
          element={isLoggedIn ? <HumanResource /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyJobs"
          element={isLoggedIn ? <Jobs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/MyInternships"
          element={isLoggedIn ? <Internship /> : <Navigate to="/signin" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default App;
