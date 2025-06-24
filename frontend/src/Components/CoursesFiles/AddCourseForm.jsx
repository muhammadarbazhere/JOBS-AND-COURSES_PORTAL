import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/logo.jpg";

function AddCourseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "", // Added author field
    description: "",
    category: "",
    duration: "",
    charges: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0], // Update image to file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author); // Append author
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("charges", formData.charges);
      formDataToSend.append("image", formData.image); // Append image file

      const response = await fetch(

        `${import.meta.env.FRONTEND_BASE_URL}/route/courses/createCourse`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const result = await response.json();
      toast.success("Course added successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        duration: "",
        charges: "",
        image: null,
      }); // Clear form data
       navigate("/MyCourseList");
      console.log(result);
    } catch (error) {
      toast.error("Error adding the course. Please try again.");
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
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Course Title ..*"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Course Author ..*"
              value={formData.author}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Course Description ..*"
              value={formData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category</option>
              <option value="Website Development">
                Website Development
              </option>
              <option value="Front-End Development">
                Front-End Development
              </option>
              <option value="Back-End Development">Back-End Development</option>
              <option value="Social Media Marketing">
                Social Media Marketing
              </option>
              <option value="SEO">SEO</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Graphic Designing">Graphic Designing</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="charges"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Charges ($)
            </label>
            <input
              type="number"
              id="charges"
              name="charges"
              placeholder="Course Charges ..*"
              value={formData.charges}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="Course Duration ..*"
              value={formData.duration}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* New file input for image upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Course Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Preview image */}
          {formData.image && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(formData.image)} // Display preview of selected image
                alt="Preview"
                className="object-contain h-40 w-full my-2"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={
              loading ||
              !formData.title ||
              !formData.author || // Ensure author is filled
              !formData.description ||
              !formData.category ||
              !formData.charges ||
              !formData.image
            }
            className={`bg-blue-500 ${
              loading ||
              !formData.title ||
              !formData.author || // Ensure author is filled
              !formData.description ||
              !formData.category ||
              !formData.charges ||
              !formData.image
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
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
