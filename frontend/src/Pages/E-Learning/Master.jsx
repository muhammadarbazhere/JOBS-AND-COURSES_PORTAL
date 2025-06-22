import React from "react";

import { GrUserWorker } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";

function Master() {
  return (
    <div className=" pb-20  px-3 lg:px-36 xl:px-48  h-auto w-full">
      <div className="heading">
        <h1 className=" text-2xl sm:text-4xl mb-8 leading-snug text-center font-[Chivo] font-bold">
          Who is this
          <span className="text-[#FE7620]"> masterclass </span>
          for ?
        </h1>
      </div>

      <div className=" flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0  items-center">
        <div className="border-2 border-gray-500 rounded-2xl h-full   w-full px-5  py-9   flex bg-white">
          <div className="pr-3 flex">
            <GrUserWorker size={30} className="text-blue-700" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold font-[Comfortaa]">
              Working Professionals
            </p>
            <p className="text-md whitespace-normal h-auto">
              who want to have a great college life filled with new
              opportunities, clear Interviews & get job.
            </p>
          </div>
        </div>

        <div className="border-2 border-gray-500 rounded-2xl h-full   w-full px-5  py-9   flex bg-white">
          <div className="pr-3 flex">
            <BsPersonFill size={30} className="text-blue-700" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold font-[Comfortaa]">
              Business Owners
            </p>
            <p className="text-md whitespace-normal h-auto">
              who want to have a great college life filled with new
              opportunities, clear Interviews & get job.
            </p>
          </div>
        </div>

        <div className="border-2 border-gray-500 rounded-2xl h-full   w-full px-5  py-9   flex bg-white">
          <div className="pr-3 flex">
            <PiStudentFill size={30} className="text-blue-700" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold font-[Comfortaa]">Students</p>
            <p className="text-md whitespace-normal h-auto">
              who want to have a great college life filled with new
              opportunities, clear Interviews & get job.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Master;
