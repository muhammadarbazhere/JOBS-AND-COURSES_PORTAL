import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpg";

function AddCourseForm() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    duration: "",
    charges: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/courses/createCourse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course");
      }

      toast.success("✅ Course added successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        duration: "",
        charges: "",
        image: null,
      });
      navigate("/MyCourseList");
    } catch (error) {
      toast.error(error.message || "❌ Error adding the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-0 overflow-hidden sm:mt-4 w-full md:w-2/3 font-[Chivo] lg:w-2/5">
      <div className="bg-white shadow-md rounded px-8 pb-8 mb-4">
        <div className="w-full items-center py-6 flex justify-center">
          <img src={logo} alt="Logo" className="w-24 h-24 rounded-full" />
        </div>
        <form onSubmit={handleSubmit} className="mx-auto">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Course Title</label>
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Author */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category</option>
              <option>Website Development</option>
              <option>Front-End Development</option>
              <option>Back-End Development</option>
              <option>Social Media Marketing</option>
              <option>SEO</option>
              <option>Human Resource</option>
              <option>Graphic Designing</option>
            </select>
          </div>
          {/* Duration */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="Course Duration (e.g., 4 weeks)"
              value={formData.duration}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Charges */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Charges ($)</label>
            <input
              type="number"
              name="charges"
              placeholder="Charges"
              value={formData.charges}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {/* Image Preview */}
          {formData.image && (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="object-cover h-40 w-full rounded"
              />
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourseForm;
