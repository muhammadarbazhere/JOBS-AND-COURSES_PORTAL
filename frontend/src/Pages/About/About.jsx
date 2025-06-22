//About
import React from 'react';
import About1 from './About1';
import About2 from './About2';

const About = () => {
  return (
    <div className="bg-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base bg-gradient-to-r  from-cyan-500 to-blue-500 font-semibold bg-clip-text tracking-wide uppercase">About Us</h2>
          <p className="mt-2 leading-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Arbaz WebCraft
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Welcome to Arbaz WebCraft, where we strive to connect talented individuals with exciting opportunities in the tech industry.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  {/* Heroicon name: outline/globe-alt */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Our Mission</h3>
                <p className="mt-2 text-base text-gray-500">
                  To provide a platform for job seekers and companies to find each other effortlessly.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500  text-white">
                  {/* Heroicon name: outline/scale */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 14h18M3 6h18" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Our Vision</h3>
                <p className="mt-2 text-base text-gray-500">
                  To empower individuals by providing access to the best opportunities in the tech industry.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  {/* Heroicon name: outline/academic-cap */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Our Values</h3>
                <p className="mt-2 text-base text-gray-500">
                  Integrity, Innovation, Collaboration, and Diversity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <About2/>
      <About1/>
     
    </div>
  );
};

export default About;
