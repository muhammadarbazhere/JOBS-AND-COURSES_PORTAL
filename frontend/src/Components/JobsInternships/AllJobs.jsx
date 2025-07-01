import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

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
    <div className="font-[Chivo] w-full">
      {loading && (
        <div className="flex items-center justify-center mt-10">
          <div className="w-6 h-6 mr-3 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 mt-3">
          <strong>Error:</strong> {error}
        </p>
      )}
      {!loading && !error && jobs.length === 0 && (
        <p className="text-center mt-3">No jobs available.</p>
      )}
      {!loading && !error && jobs.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Description</th>
              <th>Issue Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((item) => (
              <tr key={item._id}>
                <td>
                  {editId === item._id ? (
                    <input
                      name="title"
                      value={item.title}
                      onChange={(e) => handleChange(e, item._id)}
                      className="border p-1"
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td>
                  {editId === item._id ? (
                    <textarea
                      name="description"
                      value={item.description}
                      onChange={(e) => handleChange(e, item._id)}
                      className="border p-1"
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  {editId === item._id ? (
                    <select
                      name="jobOrInternship"
                      value={item.jobOrInternship}
                      onChange={(e) => handleChange(e, item._id)}
                      className="border p-1"
                    >
                      <option value="job">Job</option>
                      <option value="internship">Internship</option>
                    </select>
                  ) : (
                    item.jobOrInternship
                  )}
                </td>
                <td>
                  {editId === item._id ? (
                    <select
                      name="status"
                      value={item.status}
                      onChange={(e) => handleChange(e, item._id)}
                      className="border p-1"
                    >
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                  ) : (
                    item.status
                  )}
                </td>
                <td className="flex gap-2">
                  {editId === item._id ? (
                    <>
                      <button
                        onClick={() => handleSave(item._id)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        <IoMdSend />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 p-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <MdModeEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllJobs;
