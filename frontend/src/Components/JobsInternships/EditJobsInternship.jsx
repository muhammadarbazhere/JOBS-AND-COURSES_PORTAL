import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.jpg';

function EditJobsInternship({ onClose }) {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobOrInternship: '',
    status: 'active',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  const fetchJobById = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getJobById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch job data');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching job data:', error);
      setError('Failed to fetch job data');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update job/internship');
      }

      const result = await response.json();
      console.log(result);
      onClose();
    } catch (error) {
      console.error('Error updating job/internship:', error);
      setError('Failed to update job/internship');
    }
  };

  if (error) {
    return (
      <div className="bg-blue-100 pt-6 pb-20">
        <div className="mx-auto w-full md:w-2/3 lg:w-2/5">
          <div className="bg-white shadow-md rounded px-8 pb-8">
            <h1 className="text-3xl text-center font-bold text-red-500 py-6">
              Error
            </h1>
            <p className="text-center text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 pt-6 pb-20">
      <div className="mx-auto w-full md:w-2/3 lg:w-2/5">
        <div className="bg-white shadow-md rounded px-8 pb-8">
          <div className="flex justify-center py-4">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>

          <h1 className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-center mb-6">
            Update {formData.title}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                required
                id="title"
                type="text"
                placeholder="Job Title"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                Job Description
              </label>
              <textarea
                required
                id="description"
                placeholder="Description"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-500 text-sm font-bold mb-2">
                Job Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="jobOrInternship"
                    value="job"
                    checked={formData.jobOrInternship === 'job'}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        jobOrInternship: 'job',
                      }))
                    }
                    className="mr-2"
                  />
                  Job
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="jobOrInternship"
                    value="internship"
                    checked={formData.jobOrInternship === 'internship'}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        jobOrInternship: 'internship',
                      }))
                    }
                    className="mr-2"
                  />
                  Internship
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-500 text-sm font-bold">
                Status
              </label>
              <select
                id="status"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none"
            >
              Update Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditJobsInternship;
