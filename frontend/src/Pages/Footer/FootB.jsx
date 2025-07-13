import React from 'react';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ Import Link for internal routing
import logo from '../../assets/logo.jpg';

const FootB = () => {
  return (
    <div className='w-full h-auto bg-gradient-to-r from-cyan-500 to-blue-500 mt-6 md:mt-0 pb-0 md:pb-10 flex items-center justify-center'>
      <div className='w-full py-10 md:py-6 mx-0 text-white flex flex-col sm:flex-row md:flex-row lg:flex-row justify-around sm:justify-center'>
        
        {/* Logo and Social Icons */}
        <div className='flex flex-col justify-center items-center sm:items-start sm:mx-3 sm:mt-14'>
          <div className='w-auto sm:w-full h-16'>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className='w-20 h-auto'
              />
            </Link>
          </div>
          <h4 className='mt-4 font-[Chivo] font-bold w-auto sm:w-full'>
            Get Connected With Us<br /> On Social Networks
          </h4>
          <div className='flex justify-start lg:justify-start mt-5 w-auto sm:w-full gap-3'>
            {/* WhatsApp */}
            <a
              href="https://wa.me/923104163789"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <FaWhatsapp size={30} />
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/arbaz-mern"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
          <p className='mt-4 font-[Chivo] w-auto sm:w-full'>
            &#169; {new Date().getFullYear()} Arbaz WebCraft
          </p>
        </div>

        {/* Footer Links */}
        <div className='flex flex-col sm:flex-row items-center justify-evenly py-6 md:py-0 px-0 md:pl-6 h-auto'>
          <div className='sm:mx-3 flex flex-col items-center pb-4 sm:pb-0'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Product</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2 text-center">
                <Link to='/courses' className='hover:underline'>
                  Courses
                </Link>
              </li>
              <li className="pb-2 text-center">
                <Link to='/JobsInternships' className='hover:underline'>
                  Jobs & Internships
                </Link>
              </li>
              <li className="pb-4 text-center">
                <Link to="/outsourcing" className='hover:underline'>
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          <div className='sm:mr-3 flex flex-col items-center pb-4 sm:pb-0'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Account</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2 text-center">
                <Link to="/signin" className="hover:underline">Sign In</Link>
              </li>
              <li className="pb-2 text-center">
                <Link to="/forgot" className="hover:underline">Forget Password</Link>
              </li>
              <li className="pb-4 text-center">
                <Link to="/signup" className="hover:underline">Free Sign Up</Link>
              </li>
            </ul>
          </div>

          <div className='sm:mr-3 flex flex-col items-center pb-4 sm:pb-0'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Get In Touch</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2 text-center">
                <Link to="/policy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="pb-2 text-center">
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li className="pb-4 text-center">
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootB;
