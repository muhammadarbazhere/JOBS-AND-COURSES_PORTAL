import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function EditJobsInternship({ onClose }) {
  const { id } = useParams(); // Getting id from URL params
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobOrInternship: '',
    status: 'active', // Default status
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  const fetchJobById = async (id) => {
    try {
      const response = await fetch(`/route/jobs-internships/getJobById/${id}`);
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/route/jobs-internships/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update job/internship');
      }
      handleSuccess();
    } catch (error) {
      console.error('Error updating job/internship:', error);
      setError('Failed to update job/internship');
    }
  };

  const handleSuccess = () => {
    console.log('Job/Internship updated successfully!');
    onClose(); // Close the edit modal or switch component state
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

  if (error) {
    return (
      <div className="bg-blue-100 pt-6 pb-20">
        <div className="mx-auto w-full md:w-2/3 font-[Chivo] lg:w-2/5">
          <div className="bg-white pt-3 font-[Chivo] shadow-md rounded px-8 pb-8">
            <h1 className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold text-white flex items-center justify-center space-x-3 py-6 text-center mb-2">
              <p className="text-4xl font-bold">Update</p>
              <span className="text-3xl">{formData.title}</span>
            </h1>
            <hr />
            <div className="w-full items-center py-6 flex justify-center">
              <img src={logo} alt="Logo" className="w-24 h-24" />
            </div>
            <p className="text-center text-red-500 mt-3">
              <span className="font-bold">Error:</span> {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 pt-6 pb-20">
      <div className="mx-auto w-full md:w-2/3 font-[Chivo] lg:w-2/5">
        <div className="bg-white pt-3 font-[Chivo] shadow-md rounded px-8 pb-8">
          <h1 className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold text-white flex items-center justify-center space-x-3 py-6 text-center mb-2">
            <p className="text-4xl font-bold">Update</p>
            <span className="text-3xl">{formData.title}</span>
          </h1>
          <hr />
          <div className="w-full items-center py-6 flex justify-center">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-500 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                required
                id="title"
                type="text"
                placeholder="Job Title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-500 text-sm font-bold mb-2">
                Job Description
              </label>
              <input
                required
                id="description"
                type="text"
                placeholder="Description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-500 text-sm font-bold">Job / Internship</label>
              <div className="flex justify-between pt-2">
                <div className="flex items-center mr-4">
                  <input
                    id="jobOrInternship"
                    type="checkbox"
                    name="jobOrInternship"
                    value="job"
                    className="mr-2"
                    checked={formData.jobOrInternship === 'job'}
                    onChange={handleChange}
                  />
                  <label htmlFor="job" className="text-gray-500">
                    Job
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="jobOrInternship"
                    type="checkbox"
                    name="jobOrInternship"
                    value="internship"
                    className="mr-2"
                    checked={formData.jobOrInternship === 'internship'}
                    onChange={handleChange}
                  />
                  <label htmlFor="internship" className="text-gray-500">
                    Internship
                  </label>
                </div>
              </div>
            </div>

            {/* Status Selection */}
            <div className="mb-6">
              <label className="text-gray-500 text-sm font-bold">Status</label>
              <select
                id="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
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
