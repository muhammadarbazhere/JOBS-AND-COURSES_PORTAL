import React, { useState, useRef, useEffect } from 'react';
import { LuListFilter } from 'react-icons/lu';
import { IoIosAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllJobs from '../../../../../Components/JobsInternships/AllJobs';

function JobList() {
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  useEffect(() => {
    searchInputRef.current.focus();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Correct Auth Header
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobsData(data);
      setFilteredJobs(data); // ✅ Initialize filtered jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleAddClick = () => {
    navigate('/MyAddJobs');
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = jobsData.filter((job) =>
      job.title.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="w-full h-full px-1 sm:px-4 md:px-10 lg:px-24 py-10 font-[Chivo] bg-blue-100">
      <h1 className="text-center text-4xl text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text font-bold">
        Jobs Table
      </h1>

      <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search jobs here"
          className="border border-gray-300 rounded-md px-4 py-2 mb-10"
          ref={searchInputRef}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-4 flex justify-between pb-12">
        <div className="firstDiv flex justify-center">
          <div className="bg-white rounded-md cursor-pointer px-1 sm:px-4 py-2 border border-gray-300 text-xs sm:text-base">
            All Jobs
          </div>

          <div className="bg-white cursor-pointer rounded-md px-1 sm:px-4 ml-1 sm:ml-4 flex gap-1 sm:gap-2 py-2 text-blue-400 items-center text-xs sm:text-base">
            <span>
              <LuListFilter />
            </span>
            <span>Filter</span>
          </div>
        </div>

        <div className="SecondDiv flex justify-center">
          <div
            onClick={handleAddClick}
            className="bg-white px-1 sm:px-4 py-2 border-2 border-[#5F9BCE] hover:bg-[#5F9BCE] hover:text-white rounded-xl  flex items-center text-[#5F9BCE] cursor-pointer duration-700 text-xs sm:text-base"
          >
            <IoIosAdd />
            <span>ADD</span>
          </div>

          <div className="bg-white rounded-md cursor-pointer pl-1 sm:px-4 py-2 border border-gray-300 sm:ml-4 ml-1 text-xs sm:text-base">
            Export
          </div>
        </div>
      </div>

      {/* ✅ Pass filteredJobs instead of jobsData */}
      <AllJobs jobs={filteredJobs} />
    </div>
  );
}

export default JobList;
