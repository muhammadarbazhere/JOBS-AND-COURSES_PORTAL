import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import logo from '../../assets/logo.jpg'

const FootB = () => {

  return (
    <div className='w-full h-auto bg-gradient-to-r from-cyan-500 to-blue-500 mt-6 md:mt-0 pb-0 md:pb-10 flex items-center justify-center'>
      <div className='w-full py-10 md:py-10 mx-0 text-white flex flex-col   sm:flex-row md:flex-row lg:flex-row justify-around sm:justify-center '>


        <div className='flex flex-col justify-center  items-center sm:items-start sm:mx-3 sm:mt-14'>
          <div className=' w-auto sm:w-full h-16'>
          <img
            src={logo}
            alt="logo"
            className='w-20 h-auto'
          />
          </div>
          <h4 className='mt-4 font-[Chivo] font-bold   w-auto sm:w-full '>Get Connected With Us<br/> On Social Networks</h4>
          <div className='flex justify-start lg:justify-between  mt-5 w-auto sm:w-full '>
            <FaFacebookSquare size={30}/>
            <FaTwitterSquare size={30} />
            <FaInstagram size={30} />
            <FaLinkedin size={30} />
          </div>
          <p className=' mt-4 font-[Chivo]   w-auto sm:w-full'>&#169; {new Date().getFullYear()} Arbaz WebCraft</p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-evenly  py-6 md:py-0  px-0 md:pl-6 h-auto '>
       
       
          <div className='sm:mx-3 flex flex-col items-center'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Product</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2">Marketplace</li>
              <li className="pb-2">List Your Api</li>
              <li className="pb-4">Why Choose Us</li>
            </ul>
          </div>
          <div className='sm:mt-16 sm:mr-3 flex flex-col items-center'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Docs & Helps</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2">Docs</li>
              <li className="pb-2">Blogs</li>
              <li className="pb-2">FAQs</li>
              <li className="pb-2">Write For Us</li>
              <li className="pb-4">API Glossary</li>
            </ul>
          </div>
         
          <div className='   sm:mr-3 flex flex-col items-center'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Account</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2">Sign In</li>
              <li className="pb-2">Forget Password</li>
              <li className="pb-4">Free Sign up</li>
            </ul>
          </div>
          <div className='   sm:mr-3 flex flex-col items-center'>
            <h6 className='font-bold mb-3 text-lg font-[Comfortaa]'>Get In Touch</h6>
            <ul className="list-none font-[Chivo]">
              <li className="pb-2">Support</li>
              <li className="pb-2">List Your Api</li>
              <li className="pb-4">Contact Us</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
   
  );
};

export default FootB;
