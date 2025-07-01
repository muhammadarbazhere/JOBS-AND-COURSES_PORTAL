import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEdit, MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CoursesTable = () => {
  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/courses/getCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token here
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/courses/deleteCourse/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token here
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  return (
    <div className="font-[Chivo] h-full pb-6 w-auto">
      <h1 className="py-10 text-center text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-4xl font-bold">
        Courses List
      </h1>

      <div className="flex justify-end text-sm sm:text-xl font-bold mr-1">
        <a
          href="/MyAddCourse"
          className="cursor-pointer bg-white hover:bg-blue-400 hover:text-white border px-2 flex py-2 mb-4 border-blue-400 text-blue-400 items-center justify-center rounded-lg duration-700"
        >
          Add Courses
          <span className="text-red-300 mx-2">
            <MdAddCircle />
          </span>
        </a>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && courses.length === 0 ? (
        <div className="flex justify-center h-full mt-44">
          <p className="text-3xl text-center">Please add courses...</p>
        </div>
      ) : (
        <table className="w-full md:min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="bg-[#5F9BCE] text-white text-left lg:px-8 px-2 text-xs sm:text-base py-4">
                Title
              </th>
              <th className="bg-[#5F9BCE] text-white text-left lg:px-8 px-2 py-4 text-xs sm:text-base">
                Category
              </th>
              <th className="bg-[#5F9BCE] text-white text-left md:px-8 px-2 py-4 text-xs sm:text-base">
                Description
              </th>
              <th className="bg-[#5F9BCE] text-white text-left lg:px-8 px-2 py-4 text-xs sm:text-base"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <React.Fragment key={item._id}>
                <tr>
                  <td className="text-gray-500 lg:px-8 px-2 py-4 text-xs sm:text-base">
                    {item.title}
                  </td>
                  <td className="text-gray-500 lg:px-8 px-2 py-4 text-xs sm:text-base">
                    {item.category}
                  </td>
                  <td className="text-gray-500 lg:px-8 px-2 py-4 text-xs sm:text-base">
                    {item.description}
                  </td>
                  <td className="text-gray-500 flex gap-1 lg:px-8 px-2 py-4 text-xs sm:text-base">
                    <Link to={`/MyEdit/${item._id}`}>
                      <MdModeEdit size={20} />
                    </Link>
                    <button onClick={() => handleDeleteCourse(item._id)}>
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="7">
                    <div className="border"></div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesTable;
