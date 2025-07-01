import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";

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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("charges", formData.charges);
      formDataToSend.append("image", formData.image);

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

      const result = await response.json();
      toast.success("✅ Course added successfully!");
      console.log(result);

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
    <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
      <div className="bg-white shadow-md rounded font-[Chivo] px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-center rounded-md mb-0">
          <img src={logo} alt="Logo" className="mb-5 h-28 w-28" />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div className="mb-4">
            <label className="block mb-2">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course Title.."
              required
              className="input-style"
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Course Author.."
              required
              className="input-style"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course Description.."
              required
              className="input-style"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-style"
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

          {/* Charges */}
          <div className="mb-4">
            <label className="block mb-2">Charges ($)</label>
            <input
              type="number"
              name="charges"
              value={formData.charges}
              onChange={handleChange}
              placeholder="Course Charges.."
              required
              className="input-style"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Course Duration.."
              required
              className="input-style"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="input-style"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="object-contain h-40 w-full"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            } w-full rounded-xl text-white font-bold py-2 px-4 focus:outline-none`}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddCourseForm;
