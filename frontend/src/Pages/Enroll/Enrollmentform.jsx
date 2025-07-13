import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Enrollmentform = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    homeAddress: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log('Form submitted:', formData);

    // simulate API call or logic
    setTimeout(() => {
      navigate('/'); // ✅ use navigate to go to homepage
    }, 500);
  };

  return (
    <div id='enrollmentForm' className="py-8 px-4 sm:px-0 text-black bg-blue-100 w-full">
      <h2 className="text-3xl font-bold mb-4 text-center font-[Comfortaa]">Enrollment Form</h2>
      <form onSubmit={handleSubmit} className="max-w-md font-[Chivo] mx-auto">
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            required
            placeholder='Your Full Name Here *'
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            required
            placeholder='Enter Your Email *'
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone:</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder='Enter Your Mobile Number *'
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Home Address:</label>
          <input
            type="text"
            name="homeAddress"
            required
            placeholder='Enter Your Permanent Address *'
            value={formData.homeAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            required
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500
           text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Enrollmentform;
