import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpg";

function JobApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    resume: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Submission state

  useEffect(() => {
    if (!id) {
      toast.error("Invalid job ID");
      navigate("/remoteJobs");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleNextStep = () => {
    if (formData.firstName && formData.email) {
      setCurrentStep(2);
    } else {
      toast.warn("Please fill out your name and email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Please upload your resume.");
      return;
    }

    const formDataForUpload = new FormData();
    formDataForUpload.append("firstName", formData.firstName);
    formDataForUpload.append("email", formData.email);
    formDataForUpload.append("resume", formData.resume);

    try {
      setIsSubmitting(true); // ✅ Show loader
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/form/apply/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataForUpload,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit application");
      }

      toast.success("🎉 Application submitted successfully!");
      setTimeout(() => {
        navigate("/remoteJobs", { replace: true }); // ✅ Redirect
      }, 1500); // Give user time to see the success toast
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false); // ✅ Hide loader
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pb-8 mb-4 w-full max-w-lg font-[Chivo]">
        <div className="w-full flex justify-center py-6">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!formData.firstName || !formData.email}
                className={`mt-4 ${
                  !formData.firstName || !formData.email
                    ? "bg-blue-300"
                    : "bg-blue-500 hover:bg-blue-600"
                } w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300`}
              >
                Next
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={!formData.resume || isSubmitting}
                className={`mt-4 ${
                  !formData.resume || isSubmitting
                    ? "bg-blue-300"
                    : "bg-blue-500 hover:bg-blue-600"
                } w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default JobApplyForm;
