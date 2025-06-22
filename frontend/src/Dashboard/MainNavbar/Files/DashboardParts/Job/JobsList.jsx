import React, { useState, useRef, useEffect } from 'react';
import { LuListFilter } from 'react-icons/lu';
import { IoIosAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AllJobs from '../../../../../Components/JobsInternships/AllJobs';

function CourseList() {
  const [selectedOption1, setSelectedOption1] = useState('All Properties');
  const [selectedOption2, setSelectedOption2] = useState('Today');
  const [selectedOption3, setSelectedOption3] = useState('Export');
  const [jobsData, setJobsData] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus the search input when the component mounts
    searchInputRef.current.focus();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/route/jobs-internships/getAllJobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobsData(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleAddClick = () => {
    navigate('/MyAddJobs');
  };

  const handleSelect1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelect2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleSelect3 = (event) => {
    setSelectedOption3(event.target.value);
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
        />
      </div>

      <div className="mt-4 flex justify-between pb-12">
        <div className="firstDiv flex justify-center">
          <select
            value={selectedOption1}
            onChange={handleSelect1}
            className="bg-white rounded-md cursor-pointer px-1 sm:px-4 py-2 border border-gray-300 text-xs sm:text-base"
          >
            <option value="All Properties">All Properties</option>
            <option value="Item 1">Item 1</option>
            <option value="Item 2">Item 2</option>
          </select>

          <select
            value={selectedOption2}
            onChange={handleSelect2}
            className="bg-white rounded-md cursor-pointer px-1 sm:px-4 py-2 border border-gray-300 ml-1 sm:ml-4 text-xs sm:text-base"
          >
            <option value="Today">Today</option>
            <option value="Item 1">Item 1</option>
            <option value="Item 2">Item 2</option>
          </select>

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
            className="bg-white px-1 sm:px-4 py-2 border-2 border-[#5F9BCE] hover:bg-[#5F9BCE] hover:text-white rounded-xl  flex items-center text-[#5F9BCE] cursor-pointer duration-1000 text-xs sm:text-base"
          >
            <span className="">
              <IoIosAdd />
            </span>
            <span className="">ADD</span>
          </div>

          <select
            value={selectedOption3}
            onChange={handleSelect3}
            className="bg-white rounded-md cursor-pointer pl-1 sm:px-4 py-2 border border-gray-300 sm:ml-4 ml-1 text-xs sm:text-base"
          >
            <option value="Export">Export</option>
            <option value="Item 1">Item 1</option>
            <option value="Item 2">Item 2</option>
          </select>
        </div>
      </div>

      {/* Display All Jobs Component */}
      <AllJobs jobs={jobsData} />

    </div>
  );
}

export default CourseList;
