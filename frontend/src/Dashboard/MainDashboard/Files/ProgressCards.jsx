import React, { useEffect, useState } from 'react';
import { FaUsers, FaBook, FaBriefcase, FaUserGraduate } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ProgressCards = () => {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    jobs: 0,
    internships: 0,
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.warn("No token - skipping dashboard API call");
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    if (!token) return;

    try {
      // Fetch users
      const userRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/allUsers`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userRes.json();

      // Fetch courses
      const courseRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/courses/getCourses`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const coursesData = await courseRes.json();

      // Fetch jobs
      const jobsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jobsData = await jobsRes.json();

      // Split jobs and internships count
      const jobsCount = jobsData.filter(item => item.jobOrInternship === 'job').length;
      const internshipsCount = jobsData.filter(item => item.jobOrInternship === 'internship').length;

      setCounts({
        students: userData.users?.length || 0,
        courses: coursesData?.length || 0,
        jobs: jobsCount,
        internships: internshipsCount,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
    }
  };

  const AnimatedNumber = ({ target }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = target;
      if (start === end) return;
      const incrementTime = 20;
      const increment = Math.ceil(end / 100);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, incrementTime);
      return () => clearInterval(timer);
    }, [target]);
    return <h1 className="text-3xl font-bold text-white">{count}</h1>;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-2">
      {/* Card 1: Members */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-5 flex flex-col items-start justify-center shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
        <FaUsers className="text-blue-400 text-4xl mb-2 drop-shadow-lg" />
        <AnimatedNumber target={counts.students} />
        <h5 className="text-sm text-gray-400 mt-1 tracking-wide">MEMBERS ONLINE</h5>
      </div>

      {/* Card 2: Courses */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-5 flex flex-col items-start justify-center shadow-lg hover:shadow-green-500/30 transition-all duration-300">
        <FaBook className="text-green-400 text-4xl mb-2 drop-shadow-lg" />
        <AnimatedNumber target={counts.courses} />
        <h5 className="text-sm text-gray-400 mt-1 tracking-wide">COURSES</h5>
      </div>

      {/* Card 3: Jobs */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-5 flex flex-col items-start justify-center shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
        <FaBriefcase className="text-orange-400 text-4xl mb-2 drop-shadow-lg" />
        <AnimatedNumber target={counts.jobs} />
        <h5 className="text-sm text-gray-400 mt-1 tracking-wide">JOBS</h5>
      </div>

      {/* Card 4: Internships */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-5 flex flex-col items-start justify-center shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
        <FaUserGraduate className="text-purple-400 text-4xl mb-2 drop-shadow-lg" />
        <AnimatedNumber target={counts.internships} />
        <h5 className="text-sm text-gray-400 mt-1 tracking-wide">INTERNSHIPS</h5>
      </div>
    </div>
  );
};

export default ProgressCards;
