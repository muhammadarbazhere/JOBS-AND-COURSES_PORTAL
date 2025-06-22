import React, { useState } from 'react';
import Products from './Products'; 

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Modules = () => {
  const [expandedItems, setExpandedItems] = useState(new Array(Products.length).fill(false));

  const handleToggle = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };
  

  return (
    <div className="px-3 md:px-4 w-full lg:px-28 py-6 overflow-hidden">

      <h1 className='text-3xl sm:text-4xl mb-8 mt-10 text-center font-bold font-[Chivo] '>What will you <span className='text-[#FE7620]'>learn ?</span></h1>

      {Products.map((product, index) => (
        <div key={index} className="bg-[#0B001F] rounded-md py-8 pl-5 pr-2 md:px-10 mb-6 transition-colors duration-300 ease-in-out">
          <div onClick={() => handleToggle(index)} className="flex items-center justify-between cursor-pointer">
            <div className='font-[Chivo]'>
              <h2 className="text-white text-lg">{product.module}</h2>
              <h3 className="text-white text-3xl">{product.title}</h3>
            </div>
            {expandedItems[index] ? (
              <IoIosArrowDown className="text-white" fontSize={25}/>
            ) : (
              <IoIosArrowBack className="text-white" fontSize={25}/>
            )}
          </div>
          {expandedItems[index] && (
            <div className="flex md:flex-col lg:flex-row mt-4 transition-all duration-700 ease-in-out">
              <img src={product.imageLink} alt="Product" className="lg:w-1/2 h-auto md:w-full md:mb-8 mb-0 mr-4 hidden md:block" />
              <div className="text-white">
                <div className='flex flex-wrap space-x-1 md:space-x-0 space-y-0 md:space-y-0 lg:pl-6 font-[Chivo]'>
                  <p className='bg-[#252453] mb-3 mr-3 md:mr-4 border-2 flex flex-row justify-center items-center border-[#252453] w-36 h-9 py-1 rounded-full'> 
                    <span className='pr-2'><BsFillCameraVideoFill /></span>
                    {product.btn1}
                  </p>
                  <p className='bg-[#252453] mb-3 border-2 flex flex-row justify-center items-center border-[#252453] w-44 h-9 py-1 rounded-full'>  
                    <span className='pr-2'><MdOutlineWatchLater /></span>
                    {product.btn}
                  </p>
                </div>
                <div className='space-y-2 mt-6 text-lg sm:text-xl font-[Chivo]'>
                  <p className='flex items-center sm:pl-4'>
                    <span className='pr-3 text-2xl text-green-400'><TiTick/></span>
                    {product.desc1}
                  </p>
                  <p className='flex items-center sm:pl-4'>
                    <span className='pr-3 text-2xl text-green-400'><TiTick/></span>
                    {product.desc2}
                  </p>
                  <p className='flex items-center sm:pl-4'>
                    <span className='pr-3 text-2xl text-green-400'><TiTick/></span>
                    {product.desc3}
                  </p>
                  <p className='flex items-center sm:pl-4'>
                    <span className='pr-3 text-2xl text-green-400'><TiTick/></span>
                    {product.desc4}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Modules;
