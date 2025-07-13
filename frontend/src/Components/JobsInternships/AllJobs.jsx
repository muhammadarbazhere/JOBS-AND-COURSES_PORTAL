import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return; // 👈 Stop if cancelled

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      setError(error.message || "Failed to delete job.");
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobToEdit),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update job/internship");
      }
      setEditId(null);
    } catch (error) {
      setError(error.message || "Failed to update job.");
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setJobs(
      jobs.map((job) =>
        job._id === id ? { ...job, [name]: value } : job
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="font-[Chivo] px-2 sm:px-6 lg:px-12 py-6 min-h-screen bg-blue-50">
      {loading && (
        <div className="flex items-center justify-center mt-10">
          <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="ml-2 text-blue-500">Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 mt-3">
          <strong>Error:</strong> {error}
        </p>
      )}
      {!loading && !error && jobs.length === 0 && (
        <p className="text-center mt-3 text-gray-600">No jobs available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4"
          >
            {editId === item._id ? (
              <>
                <input
                  name="title"
                  value={item.title}
                  onChange={(e) => handleChange(e, item._id)}
                  className="border p-1 mb-2 w-full"
                  placeholder="Job Title"
                />
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, item._id)}
                  className="border p-1 mb-2 w-full"
                  placeholder="Description"
                />
                <select
                  name="jobOrInternship"
                  value={item.jobOrInternship}
                  onChange={(e) => handleChange(e, item._id)}
                  className="border p-1 mb-2 w-full"
                >
                  <option value="job">Job</option>
                  <option value="internship">Internship</option>
                </select>
                <select
                  name="status"
                  value={item.status}
                  onChange={(e) => handleChange(e, item._id)}
                  className="border p-1 mb-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </>
            ) : (
              <>
                <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-gray-600 mb-1">
                  <strong>Type:</strong> {item.jobOrInternship}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Issue Date:</strong> {formatDate(item.createdAt)}
                </p>
                <p
                  className={`font-semibold ${
                    item.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </p>
              </>
            )}

            <div className="flex gap-2 mt-2">
              {editId === item._id ? (
                <>
                  <button
                    onClick={() => handleSave(item._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    <IoMdSend />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
