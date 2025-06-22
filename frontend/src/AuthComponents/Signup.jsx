import React, { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";

function Signup() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: files[0],
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('firstName', inputs.firstName);
      formData.append('lastName', inputs.lastName);
      formData.append('email', inputs.email);
      formData.append('password', inputs.password);
      formData.append('dateOfBirth', inputs.dateOfBirth);
      formData.append('image', inputs.image);

      const response = await fetch('/route/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log response data for debugging
        navigate("/signin"); // Navigate to sign-in page on successful signup
        alert('Account created successfully. Please check your email for confirmation.');

        // Reset form fields after submission
        setInputs({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          dateOfBirth: '',
          image: null,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (err) {
      console.log("Error in fetch request:", err); // Log fetch error for debugging
      setError(err.message || "Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-100 p-1">
      <div className="flex justify-center h-full items-center pt-10 pb-20">
        <div className="bg-white rounded-lg p-10 shadow-md" style={{ width: "550px" }}>
          <div className="items-center flex justify-center">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>

          <div className="my-5 h-[1px]" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <FaUser className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] rounded-lg border border-gray-300 h-10"
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaUser className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                className="form-input px-2 mt-1  h-10 w-full md:w-[calc(100%-2.5rem)] rounded-lg border border-gray-300"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaEnvelope className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="email"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] border rounded-lg border-gray-300 h-10"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <MdOutlineWifiPassword className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="password"
                id="password"
                name="password"
                minLength={8}
                value={inputs.password}
                onChange={handleChange}
                className="form-input mt-1 px-2 w-full md:w-[calc(100%-2.5rem)] border rounded-lg border-gray-300 h-10"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
            <MdOutlineDateRange className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={inputs.dateOfBirth}
                onChange={handleChange}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] rounded-lg border border-gray-300 h-10"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-4 py-2  rounded-md hover:bg-gray-300 w-full"
              >
                <label className="w-full text-center flex justify-evenly">
                 <h5> Upload Image</h5>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required
                    className="hidden sm:block"
                  />
                </label>
              </button>
            </div>
            <button
              type="submit"
              className="bg-white text-[#5F9BCE] border-2 border-[#5F9BCE] mt-4 px-4 py-2 rounded-md hover:bg-[#5F9BCE] focus:outline-none hover:text-white w-full duration-700 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="text-center text-sm mt-2">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="text-red-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
