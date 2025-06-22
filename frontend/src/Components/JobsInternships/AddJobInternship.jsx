import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.jpg';

function AddJobInternshipForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobOrInternship: '', // This will store either 'job' or 'internship'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobOrInternship || !formData.title || !formData.description) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await fetch('/route/jobs-internships/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Corrected to send formData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding job/internship');
      }

      const result = await response.json();
      console.log(result);
      toast.success('Added successfully!');
      navigate('/MyJobsList');
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Error adding job/internship. Please try again.');
    }
  };

  return (
    <div className="mx-auto mt-0 overflow-hidden sm:mt-4 w-full md:w-2/3 font-[Chivo] lg:w-2/5">
      <div className="bg-white shadow-md rounded px-8 pb-8 mb-4">
        <div className='w-full items-center py-6 flex justify-center'>
          <img src={logo} alt="Logo" className='w-24 h-24'/>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-500 text-sm font-bold mb-2">Job Title</label>
            <input
              required
              id="title"
              name='title'
              type="text"
              placeholder='Job Title'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-500 text-sm font-bold mb-2">Job Description</label>
            <input
              required
              id="description"
              name='description'
              type="text"
              placeholder='Description'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between mb-2">
            <div>
              <input
                id="job"
                type="radio"
                name="jobOrInternship"
                value="job"
                className="mr-2 leading-tight"
                checked={formData.jobOrInternship === 'job'}
                onChange={handleChange}
              />
              <label htmlFor="job" className="text-gray-500">Job</label>
            </div>
            <div>
              <input
                id="internship"
                type="radio"
                name="jobOrInternship"
                value="internship"
                className="mr-2 leading-tight"
                checked={formData.jobOrInternship === 'internship'}
                onChange={handleChange}
              />
              <label htmlFor="internship" className="text-gray-500">Internship</label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!formData.title || !formData.description || !formData.jobOrInternship}
            className={`bg-blue-500 ${(!formData.title || !formData.description || !formData.jobOrInternship) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJobInternshipForm;
