// About2
import React from 'react';
import logo from '../../assets/myImage.jpg'

const About2 = () => {
  return (
    <div className="bg-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base bg-gradient-to-r from-purple-500 to-pink-500 font-semibold bg-clip-text tracking-wide uppercase">About the Founder</h2>
          <p className="mt-2 leading-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet Muhammad Arbaz
          </p>
          <div className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            <img 
              src={logo} 
              alt="Muhammad Arbaz" 
              className="mx-auto rounded-full h-40 w-40 object-cover"
            />
            <p className="mt-4">
              Hello! I'm Muhammad Arbaz, a passionate MERN stack web developer dedicated to creating a platform that bridges the gap between job seekers, interns, and companies. With a keen eye for detail and a drive for innovation, I strive to deliver the best user experience through Arbaz WebCraft.
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default About2;
