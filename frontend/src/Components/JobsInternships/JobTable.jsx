import React, { useState, useEffect } from 'react';
import { GoTrash } from 'react-icons/go';
import { MdModeEdit } from 'react-icons/md';
import EditJobsInternship from './EditJobsInternship';

const JobTable = () => {
  const [jobsData, setJobsData] = useState([]);
  const [editJobId, setEditJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobsData(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      fetchJobs(); // Refresh jobs list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (id) => {
    setEditJobId(id);
  };

  const handleCloseEdit = () => {
    setEditJobId(null);
  };

  const formatDate = (dateString) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    if (dateString === currentDate) {
      return 'Today';
    } else if (dateString === new Date(Date.now() - 864e5).toISOString().slice(0, 10)) {
      return 'Yesterday';
    } else {
      return dateString;
    }
  };

  return (
    <div className="font-[Chivo] h-full w-full">
      {editJobId && <EditJobsInternship jobId={editJobId} onClose={handleCloseEdit} />}

      <h1 className="py-10 text-center text-[#5F9BCE] text-4xl font-bold">All Jobs</h1>
      <table className="w-full rounded-lg">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-4 px-6 text-left">JOB TITLE</th>
            <th className="py-4 px-6 text-left">DESCRIPTION</th>
            <th className="py-4 px-6 text-left">JOB TYPE</th>
            <th className="py-4 px-6 text-left">ISSUE DATE</th>
            <th className="py-4 px-6 text-left">STATUS</th>
            <th className="py-4 px-6 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {jobsData.map((item) => (
            <tr key={item.id} className="bg-white border-b border-gray-200">
              <td className="py-4 px-6 text-gray-700">{item.title}</td>
              <td className="py-4 px-6 text-gray-700">{item.description}</td>
              <td className="py-4 px-6 text-gray-700">{item.type}</td>
              <td className="py-4 px-6 text-gray-700">{formatDate(item.issue)}</td>
              <td className={`py-4 px-6 ${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                {item.status}
              </td>
              <td className="py-4 px-6">
                <div className="flex">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-400 hover:text-blue-600 mr-2"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <GoTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
