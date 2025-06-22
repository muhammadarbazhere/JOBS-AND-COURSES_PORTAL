import React, { useState } from "react";
import certificate from "../../assets/certificate.jpg";
import { FaArrowRight } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// import Form from './Courses/Form';

function Certificate() {
    const navigate = useNavigate()

  const handleClickCertificate = () => {
    navigate('/form')
  }

  return (
    <div className="  px-4 lg:px-0 w-full  lg:items-center flex flex-col justify-center my-0 py-16">
      <p className="block lg:hidden  text-2xl  mt-4 justify-center items-center sm:text-4xl text-center font-[Chivo] font-bold">
        {" "}
        Get
        <span className="text-[#FE7620] pl-2"> Certified </span>
      </p>

      <div className="w-full lg:w-5/5 flex flex-col-reverse  lg:flex-row py-4 lg:py-0 lg:pr-28">
        <div className=" pt-4 lg:pr-12 lg:mr-28 lg:pt-0 text-lg px-2 lg:px-0 space-y-3 w-full flex flex-col justify-center items-center ">
          <p className="hidden lg:block  text-5xl justify-center items-center  text-center font-[Chivo] font-bold">
            {" "}
            Get
            <span className="text-[#FE7620]"> Certified </span>
          </p>

          <p className="flex  justify-center items-center gap-3 font-[Chivo]">
            {" "}
            <FaCrown size={20} className="text-[#FE7620]" /> Earn your
            credential of Expertise
          </p>
          <p className="flex justify-center items-center gap-3 font-[Chivo]">
            {" "}
            <FaShareAlt size={20} className="text-[#FE7620]" /> Share your
            verified certificate
          </p>
          <p className="flex justify-center items-center gap-3 font-[Chivo]">
            {" "}
            <IoCheckmarkCircle size={20} className="text-[#FE7620]" /> Add
            certificate to your Linkedin
          </p>

          <a
            onClick={handleClickCertificate}
            className="bg-gradient-to-r from-cyan-500 to-blue-500  w-full md:w-auto md:px-36 lg:px-20 lg:ml-8 pl-8 sm:pl-0   py-4 justify-around cursor-pointer flex  items-center rounded-md text-white font-[Chivo] mb-2"
          >
            Upskills Today{" "}
            <span className="ml-12">
              <FaArrowRight />
            </span>
          </a>
        </div>

        <div className="w-full lg:w-5/5 bg-blue-800 my-0 py-0">
          <img className="w-full h-full" src={certificate} alt="certificate" />
        </div>
      </div>
    </div>
  );
}

export default Certificate;
