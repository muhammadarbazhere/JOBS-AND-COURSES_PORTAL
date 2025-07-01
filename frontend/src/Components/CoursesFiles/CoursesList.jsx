import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

function Courses() {
  const token = useSelector((state) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/courses/getCourses`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // ✅ Add to Cart Handler (with token)
  const handleAddToCart = async (course) => {
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/cart/addCart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
          body: JSON.stringify({ courseId: course._id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add course to cart');
      }

      toast.success(`${course.title} added to cart!`);
    } catch (error) {
      toast.error(`Failed to add ${course.title}: ${error.message}`);
      console.error('Error adding course to cart:', error);
    }
  };

  // ✅ Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCourses = courses.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-[Chivo] bg-blue-100 px-4 lg:px-6 xl:px-20">
      {loading && (
        <div className="flex items-center justify-center mt-10">
          <div className="w-6 h-6 mr-3 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 mt-3">
          <span className="font-bold">Error:</span> {error}
        </p>
      )}
      <ToastContainer />

      {!loading && courses.length === 0 ? (
        <div className="flex justify-center h-full">
          <p className="text-lg text-center pt-12 text-gray-700 font-bold">
            No courses available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-3">
          {currentCourses.map((course) => (
            <div
              key={course._id}
              className="w-full sm:max-w-sm rounded-md overflow-hidden bg-white mb-6 border-2 border-white shadow-lg transform transition-all hover:scale-105"
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${course.image}`}
                className="w-full h-64 object-cover"
                alt={course.title}
              />
              <div className="px-3 py-2">
                <div className="font-bold text-gray-800 text-xl mb-0">
                  {course.title}
                </div>
                <p className="text-gray-700 flex gap-2 font-bold text-sm mb-1">
                  <span>{course.category}</span>
                  <FaArrowTrendUp size={20} />
                </p>
                <p className="text-gray-700 pb-1 text-base">
                  {course.description}
                </p>

                <div className="flex items-center justify-start gap-2">
                  <p className="font-bold text-gray-800 text-xl">
                    ${course.charges}
                  </p>
                  <p className="font-bold line-through text-gray-600 text-base">
                    ${(course.charges * 5.7).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(course)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 flex rounded-md text-white font-[Chivo] my-2 w-full text-center items-center justify-center"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center pt-6">
        <button
          className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={() =>
            setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from(
          { length: Math.ceil(courses.length / postsPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`mx-1 px-3 py-1 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#5F9BCE] text-white hover:bg-[#5F9BCE]'
              } rounded-lg hover:bg-[#5F9BCE] focus:outline-none`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={() =>
            setCurrentPage(
              currentPage === Math.ceil(courses.length / postsPerPage)
                ? currentPage
                : currentPage + 1
            )
          }
          disabled={currentPage === Math.ceil(courses.length / postsPerPage)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Courses;
