import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.jpg';
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useSelector } from "react-redux";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // ✅ Token from Redux

  const [updateData, setUpdateData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    charges: '',
    duration: '',
    image: null
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/route/courses/getCourseById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Use token instead of credentials
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setUpdateData({
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          charges: data.charges,
          duration: data.duration,
          image: data.image,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error.message);
        toast.error('Error fetching course');
      }
    };

    fetchCourse();
  }, [id, token]);

  const newData = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setUpdateData({
        ...updateData,
        image: files[0],
      });
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", updateData.title);
      formData.append("author", updateData.author);
      formData.append("description", updateData.description);
      formData.append("category", updateData.category);
      formData.append("charges", updateData.charges);
      formData.append("duration", updateData.duration);
      if (updateData.image && typeof updateData.image !== "string") {
        formData.append("image", updateData.image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/courses/updateCourse/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      toast.success('Course updated successfully');
      navigate("/MyCourseList");
    } catch (error) {
      console.error('Error updating course:', error.message);
      toast.error('Error updating course');
    }
  };

  const handleCancelEdit = () => {
    navigate("/MyCourseList");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="bg-blue-100 py-20">
      <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="flex items-end justify-end">
            <button
              onClick={handleCancelEdit}
              className="text-black font-bold py-2 px-4 rounded mb-4 focus:outline-none"
            >
              <MdOutlineCancelPresentation fontSize={30} />
            </button>
          </div>

          <h1 className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold flex justify-center space-x-3 py-6 mb-2">
            <span>Update</span>
            <span className="text-2xl">{updateData.title}</span>
          </h1>

          <div className="flex justify-center mb-2">
            <img src={logo} alt="Logo" className="h-28 w-28" />
          </div>

          <form onSubmit={handleUpdate}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
              <input
                type="text"
                name="title"
                value={updateData.title}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={updateData.author}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={updateData.description}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                rows={3}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select
                name="category"
                value={updateData.category}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                required
              >
                <option value="">Select a category</option>
                <option value="Website Development">Website Development</option>
                <option value="Front-End Development">Front-End Development</option>
                <option value="Back-End Development">Back-End Development</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="SEO">SEO</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Graphic Designing">Graphic Designing</option>
              </select>
            </div>

            {/* Charges */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Charges ($)</label>
              <input
                type="number"
                name="charges"
                value={updateData.charges}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={updateData.duration}
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Course Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={newData}
                className="shadow border rounded w-full py-2 px-3"
              />
              {/* ✅ Preview existing image or selected new image */}
              {updateData.image && typeof updateData.image === 'string' && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/route/${updateData.image}`}
                  alt="Course"
                  className="mt-3 object-contain h-40 w-full"
                />
              )}
              {updateData.image && typeof updateData.image !== 'string' && (
                <img
                  src={URL.createObjectURL(updateData.image)}
                  alt="Preview"
                  className="mt-3 object-contain h-40 w-full"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
