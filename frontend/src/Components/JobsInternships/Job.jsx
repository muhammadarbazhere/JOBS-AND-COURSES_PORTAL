import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.auth.token); // Get token from Redux

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
      const filteredJobs = data.filter(
        (item) => item.jobOrInternship === 'job'
      );
      setJobs(filteredJobs);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-[Chivo] h-full w-full overflow-auto">
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
          <table className="w-full rounded-lg">
         <thead>
  <tr>
    <th className="hidden"></th>
    <th className="text-left border border-gray-300 lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
      <span className="block sm:hidden">TITLE</span>
      <span className="hidden sm:block">JOB TITLE</span>
    </th>
    <th className="text-left border border-gray-300 lg:px-2 px-2 py-4 text-xs sm:text-base text-gray-700">
      DESCRIPTION
    </th>
    <th className="text-left border border-gray-300 lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
      <span className="block sm:hidden">ISSUE</span>
      <span className="hidden sm:block">ISSUE DATE</span>
    </th>
    <th className="text-left border border-gray-300 lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
      <span className="block sm:hidden">STATUS</span>
      <span className="hidden sm:block">JOB STATUS</span>
    </th>
  </tr>
</thead>

<tbody className="bg-white">
  {jobs.map((item) => (
    <tr key={item._id}>
      <td className="hidden"></td>
      <td className="text-left text-gray-500 border border-gray-300 lg:px-8 px-1 py-4 text-sm sm:text-base">
        {item.title}
      </td>
      <td className="text-left text-gray-500 border border-gray-300 lg:px-8 px-1 py-4 w-64 md:w-96 text-sm sm:text-base">
        {item.description}
      </td>
      <td className="text-left text-gray-500 border border-gray-300 lg:px-8 px-1 py-4 sm:w-28 md:w-48 text-sm sm:text-base">
        {formatDate(item.createdAt)}
      </td>
      <td
        className={`text-left border border-gray-300 lg:px-8 px-1 py-4 text-sm sm:text-base ${
          item.status === 'active' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {item.status}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </>
      )}
    </div>
  );
};

export default Job;
