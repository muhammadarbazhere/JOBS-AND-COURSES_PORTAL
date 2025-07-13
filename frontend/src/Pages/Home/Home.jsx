

import React from 'react'
import { motion } from 'framer-motion' // ✅ Add framer-motion
import logoImg from '../../assets/logo.jpg'
import HomeA from './HomeA'
import Employ from './Employees/Employ'
import Testimonials from './Testimonials/Testimonials'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  const redirectToCoursesPage = () => {
    setTimeout(() => {
      navigate('/learning');
    });
  };

  const redirectToJobsPage = () => {
    setTimeout(() => {
      navigate('/remoteJobs');
    });
  };

  return (
    <div className='bg-blue-100 h-full'>
      <motion.div
        className='w-full h-auto lg:flex pt-16 lg:pt-0 flex justify-center items-center md:h-auto md:mb-32 lg:h-screen md:m-auto'
        initial={{ opacity: 0, x: -100 }} // 👈 Start off-screen to the left
        animate={{ opacity: 1, x: 0 }}     // 👈 Animate to visible
        transition={{ duration: 1, ease: "easeOut" }} // 👈 Smooth transition
      >
        <div className='flex md:mx-16 flex-col md:flex-row lg:flex-row'>
          <motion.div
            className='w-full flex justify-center align-middle'
            initial={{ opacity: 0, x: -50 }} // 👈 Slight offset for stagger effect
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className='mx-5 md:mx-4 md:w-full lg:flex-col lg:flex justify-center lg:w-4/5/3 lg:ml-16'>
              <h1 className='font-[Chivo] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-5xl sm:text-5xl lg:text-5xl mb-3'>
                Arbaz WebCraft
              </h1>
              <p className='text-xl font-[Chivo] text-[#374151]'>
                Arbaz WebCraft is a dynamic and innovative software company founded by Arbaz Khan in 2023. Based in United Kingdom. Arbaz WebCraft specialises in Software and media solutions with a focus on new creations.
              </p>
              <div className="flex flex-col lg:flex-row font-[Chivo] lg:justify-start lg:space-x-8 mt-4 sm:items-center">
                <button onClick={redirectToJobsPage} className='bg-gradient-to-r from-cyan-500 to-blue-500 w-auto lg:w-44 md:w-48 h-14 sm:w-3/6 rounded-xl text-white'>
                  Feasible Timing
                </button>
                <button onClick={redirectToCoursesPage} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white mt-2 lg:mt-0 w-auto md:w-56 h-14 sm:w-3/6 rounded-xl'>
                  Project Base Learning
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='md:w-auto lg:w-1/2'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img src={logoImg} alt="loading" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <HomeA />
        <Employ />
        <Testimonials />
      </motion.div>
    </div>
  )
}

export default Home
