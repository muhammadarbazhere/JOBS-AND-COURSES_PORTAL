import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const JobApplyForm = () => {
  const { id } = useParams(); // Ensure id is extracted from URL params
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    resume: null,
  });
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current job ID:', id); // Debugging: Check if id is correctly populated
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Submit form data
    if (currentStep === 2 && id) {
      const formDataForUpload = new FormData();
      formDataForUpload.append("firstName", formData.firstName);
      formDataForUpload.append("email", formData.email);
      formDataForUpload.append("resume", formData.resume);
  
      const url = `${import.meta.env.FRONTEND_BASE_URL}/route/form/apply/${id}`; 
      
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            // No need for "Content-Type" header with FormData
          },
          credentials: "include",
          body: formDataForUpload,
        });

        if (response.ok) {
          toast.success("Application submitted successfully!");
          setTimeout(() => {
            window.location.href = '/remoteJobs'; // Redirect to /remoteJobs after 500ms
          }, 100);
        } else {
          throw new Error('Failed to submit application');
        }
  
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit application");
        // Handle error state or display error message
      }
    } else {
      console.error("Missing id parameter or invalid current step");
      toast.error("Failed to submit application");
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              required
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.firstName}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="block text-gray-500 text-sm font-bold mt-4 mb-2"
            >
              Email
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleChange}
            />
     <button
  type="button"
  onClick={handleNextStep}
  disabled={!formData.firstName || !formData.email }
  className={`mt-4 ${!formData.firstName || !formData.email ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300`}
>
  Next
</button>


          </div>
        );
      case 2:
        return (
          <div className="mb-6 ">
            <label
              htmlFor="resume"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Resume
            </label>
            <input
              required
              id="resume"
              name="resume"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
 <button
  type="submit"
  disabled={!formData.resume}
  className={`mt-4 ${!formData.resume ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300`}
>
  Submit Application
</button>


          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-blue-100 h-dvh flex items-center'>
    <div className="mx-auto overflow-hidden w-full md:w-2/3 font-[Chivo] lg:w-2/5 ">
      <div className=" bg-white shadow-md rounded px-8 pb-8 mb-4">
        <div className="w-full items-center py-6 flex justify-center">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>
        <form onSubmit={handleSubmit} className="mx-auto ">
          {renderFormStep()}
        </form>
      </div>
    </div>
    </div>
  );
};

export default JobApplyForm;
