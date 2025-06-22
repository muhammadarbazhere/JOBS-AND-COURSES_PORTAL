import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.jpg';
import { MdOutlineCancelPresentation } from "react-icons/md";


const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    charges: '',
    duration: '',
    image: null  // Change to null to handle file uploads
  });

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/route/courses/getCourseById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        // Update the state with the fetched course data
        setUpdateData({
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          charges: data.charges,
          duration: data.duration,
          image: data.image  // Assuming this is the URL of the image
        });
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching course:', error.message);
        toast.error('Error fetching course');
      }
    };

    fetchCourse();
  }, [id]);

  const newData = (e) => {
    if (e.target.name === "image") {
      setUpdateData({
        ...updateData,
        image: e.target.files[0]  // Update image to file object
      });
    } else {
      setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", updateData.title);
      formDataToSend.append("author", updateData.author);
      formDataToSend.append("description", updateData.description);
      formDataToSend.append("category", updateData.category);
      formDataToSend.append("charges", updateData.charges);
      formDataToSend.append("duration", updateData.duration);
      if (updateData.image && typeof updateData.image !== 'string') {
        formDataToSend.append("image", updateData.image);  // Append image file if it exists
      }
  
      const response = await fetch(`/route/courses/updateCourse/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
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

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }
  const handleCancelEdit = () => {
    navigate("/MyCourseList"); // Navigate back to the course list page
  };

  return (
    <div className="bg-blue-100 py-20">
      <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">

<div className="flex items-end justify-end">
        <button
            onClick={handleCancelEdit}
            className=" text-black  font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
          >
            <MdOutlineCancelPresentation fontSize={30}/>
          </button>
  
  </div>

          <h1 className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold text-white flex items-center justify-center space-x-3 py-6 text-center mb-2">
            <h2>
              Update
            </h2>
            <span className="text-2xl">
              {updateData.title}
            </span>
          </h1>
          <hr className="w-full h-2 text-blue-[#00008B]" />
          <div className="flex justify-center rounded-md mb-2">
            <img src={logo} alt="Logo" className="mb-5 h-28 w-28" />
          </div>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.title}
                onChange={newData}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.author}
                onChange={newData}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.description}
                onChange={newData}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select
                id="category"
                name="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.category}
                onChange={newData}
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
            <div className="mb-4">
              <label htmlFor="charges" className="block text-gray-700 text-sm font-bold mb-2">Charges ($)</label>
              <input
                type="number"
                id="charges"
                name="charges"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.charges}
                onChange={newData}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updateData.duration}
                onChange={newData}
              />
            </div>
            {/* New file input for image upload */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Course Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={newData}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {updateData.image && typeof updateData.image === 'string' && (
                <div className="mt-3">
                  <img src={`/route/${updateData.image}`} alt="Course" className="object-contain h-40 w-full" />
                </div>
              )}
              {updateData.image && typeof updateData.image !== 'string' && (
                <div className="mt-3">
                  <img src={URL.createObjectURL(updateData.image)} alt="Preview" className="object-contain h-40 w-full" />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
