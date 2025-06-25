import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null); // Track the job ID being edited

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`,
      {
        credentials: 'include', // ✅ Send token
      }
    );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Failed to fetch jobs.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
     const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/delete/${id}`,
      {
        method: "DELETE",
        credentials: 'include', // ✅ Send token
      }
    );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Remove the deleted job from the local state
      setJobs(jobs.filter((job) => job._id !== id)); // Ensure you're using _id here
    } catch (error) {
      setError(error.message || "Failed to delete job/internship.");
    }
  };

  const handleEdit = (id) => {
    setEditId(id); // Set the job ID to be edited
  };

  const handleCancelEdit = () => {
    setEditId(null); // Cancel editing
  };

  const handleSave = async (id) => {
    try {
      const jobToEdit = jobs.find((job) => job._id === id);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', // ✅ Send token
        body: JSON.stringify(jobToEdit),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update job/internship");
      }
      setEditId(null); // Clear the edit mode
    } catch (error) {
      setError(error.message || "Failed to update job/internship.");
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setJobs(
      jobs.map((job) => (job._id === id ? { ...job, [name]: value } : job))
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="font-[Chivo] h-full w-full">
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
        <p className="text-center mt-3">No jobs available.</p>
      )}
      {!loading && !error && jobs.length > 0 && (
        <>
          <table className="w-full md:min-w-full rounded-lg">
            <thead>
              <tr>
                <th className="hidden md:block"></th>
                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                  <span className="block sm:hidden">TITLE</span>
                  <span className="hidden sm:block"> JOB TITLE</span>
                </th>
                <th className="text-left lg:px-2 px-2 py-4 text-xs sm:text-base text-gray-700">
                  DESCRIPTION
                </th>
                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                  <span className="block sm:hidden">ISSUE</span>
                  <span className="hidden sm:block"> ISSUE DATE</span>
                </th>
                <th className="hidden sm:block text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                  TYPE
                </th>
                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                  <span className="block sm:hidden">STATUS</span>
                  <span className="hidden sm:block">JOB STATUS</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs.map((item) => (
                  <React.Fragment key={item._id}>
                <tr >
                  <td className="px-4 hidden md:block">
                    <input type="checkbox" />
                  </td>
                  <td className="text-gray-500 lg:px-8 px-1 py-4 text-sm sm:text-base">
                    {editId === item._id ? (
                      <input
                        type="text"
                        name="title"
                        value={item.title}
                        onChange={(e) => handleChange(e, item._id)}
                        className="border border-gray-300 p-1 rounded-md w-full"
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className="text-gray-500 lg:px-8 px-1 py-4 text-sm sm:text-base">
                    {editId === item._id ? (
                      <textarea
                        name="description"
                        value={item.description}
                        onChange={(e) => handleChange(e, item._id)}
                        className="border border-gray-300 p-1 rounded-md w-full"
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="text-gray-500 lg:px-8 w-24 sm:w-48 px-1 py-4 text-sm sm:text-base">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="hidden sm:block text-gray-500 lg:px-8 px-1 py-4 text-sm sm:text-base">
                    {/*  */}
                    {editId === item._id ? (
                       <select
                       name="jobOrInternship"
                       value={item.jobOrInternship}
                       onChange={(e) => handleChange(e, item._id)}
                       className="border mx-3 border-gray-300 p-1 rounded-md w-full"
                     >
                       <option value="job">job</option>
                       <option value="internship">internship</option>
                     </select>
                    ) : (
                      item.jobOrInternship
                    )}
                    {/*  */}
                  </td>
                  <td className="text-green-500 lg:px-8 px-1 py-4 text-sm sm:text-base">
                    {editId === item._id ? (
                      <select
                        name="status"
                        value={item.status}
                        onChange={(e) => handleChange(e, item._id)}
                        className="border mx-3 border-gray-300 p-1 rounded-md w-full"
                      >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                      </select>
                    ) : (
                      item.status
                    )}
                  </td>

                  <td className="text-gray-500 lg:px-8 px-1 py-4 flex flex-col md:flex-row md:space-x-1 lg:space-x-2 space-x-0 justify-center items-center">
                    <div className="flex space-x-1 lg:space-x-2 pb-1">
                      {editId === item._id ? (
                        <>
                          <button
                            onClick={() => handleSave(item._id)}
                            className="border-2 border-blue-400 rounded-full px-2 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                            title="Save"
                          >
                            <IoMdSend size={8} className="block md:hidden" />
                            <IoMdSend size={20} className="hidden md:block" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="border-2 border-blue-400 rounded-full px-2 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="border-2 border-blue-400 rounded-full px-2 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                          title="Edit"
                        >
                          <Link>
                            <MdModeEdit size={8} className="block md:hidden" />
                            <MdModeEdit size={20} className="hidden md:block" />
                          </Link>
                        </button>
                      )}
                    </div>
                    <div className="flex space-x-1 lg:space-x-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="border-2 border-blue-400 rounded-full px-2 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                        title="Delete"
                      >
                        <MdDelete size={8} className="block md:hidden" />
                        <MdDelete size={20} className="hidden md:block" />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
        <td colSpan="7">
          <hr />
        </td>
      </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AllJobs;
