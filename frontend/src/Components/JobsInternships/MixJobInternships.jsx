import React, { useState, useEffect } from "react";
import { FaBriefcase, FaCalendarAlt, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // ✅ Add framer-motion

const MixJobInternships = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token); // Get token from Redux

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  return (
    <motion.div
      className="font-Chivo h-full w-full p-4 bg-blue-100"
      initial={{ opacity: 0, x: -100 }} // 👈 Start off-screen to the left
      animate={{ opacity: 1, x: 0 }}     // 👈 Animate to visible
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-full space-y-1 mb-8 flex flex-col items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="font-Comfortaa mb-2 font-bold text-3xl sm:text-4xl text-gray-800 text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
          Current Openings
        </h1>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center mt-10">
          <div className="w-6 h-6 mr-3 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 mt-3">
          <span className="font-bold">Error:</span> {error}
        </p>
      )}
      {!loading && !error && jobs.length === 0 && (
        <p className="text-center mt-3">No jobs or internships available.</p>
      )}
      {!loading && !error && jobs.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 2xl:gap-14 px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15, // 👈 Stagger animation for each card
              },
            },
          }}
        >
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-sm ${job.jobOrInternship === 'job' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'} px-2 py-1 rounded-full`}>
                    {job.jobOrInternship}
                  </span>
                  <span className={`text-sm ${job.status === 'active' ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}`}>
                    {job.status === 'active' ? <IoMdAlert fontSize={16} className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    {job.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
                  <FaBriefcase className="mr-2 text-blue-500" />
                  {job.title}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    {formatDate(job.createdAt)}
                  </span>
                </div>
                <p className="text-gray-500 mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-gray-400" />
                  {job.description}
                </p>
                <div className="flex justify-end">
                  <button
                    className={`bg-gradient-to-r from-green-400 to-blue-500 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${job.status === 'closed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleApply(job._id)}
                    disabled={job.status === 'closed'}
                  >
                    {job.status === 'closed' ? 'Closed' : 'Apply Here'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MixJobInternships;
