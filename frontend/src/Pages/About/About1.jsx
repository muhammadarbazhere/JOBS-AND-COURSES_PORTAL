// About1
import React from 'react';

const About1 = () => {
  return (
    <div className="bg-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base bg-gradient-to-r from-green-500 to-teal-500 font-semibold bg-clip-text tracking-wide uppercase">About Our Platform</h2>
          <p className="mt-2 leading-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Discover Your Next Opportunity
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Arbaz WebCraft is dedicated to providing a comprehensive platform for job seekers, interns, and learners to find the best opportunities tailored to their skills and interests.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  {/* Heroicon name: outline/briefcase */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 11h18m-6 4h6M3 15h6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Our Services</h3>
                <p className="mt-2 text-base text-gray-500">
                  From job listings to internship opportunities and courses, we cover it all to help you advance your career.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  {/* Heroicon name: outline/chart-bar */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M9 9l6 6m0-6l-6 6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Why Choose Us?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our platform is designed to be user-friendly and efficient, ensuring a seamless experience for all users.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  {/* Heroicon name: outline/lightning-bolt */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Get Started</h3>
                <p className="mt-2 text-base text-gray-500">
                  Join our community today and take the first step towards a brighter future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;
