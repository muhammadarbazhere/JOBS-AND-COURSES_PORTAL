import React from "react";
import ProductData from "./Product";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

function Cards() {
  return (
    <div className="flex w-full flex-wrap py-6 ">
      {ProductData.map((item) => (
        <div
          key={item.id}
          className="bg-black w-full sm:w-[47%] mx-1  p-2 shadow-lg rounded-2xl overflow-hidden  mb-4"
        >
          <div>
            <div className=" flex justify-between gap-2">
              <div className=" border-2 rounded-full w-16 h-12">
            
                <img
                  src={item.userImg}
                  alt={item.name}
                  className="w-full h-full rounded-full"
                />
              </div>

              <div className=" w-full">
                <h2 className="text-xl text-white font-semibold">{item.name}</h2>
                <p className="text-blue-900">{item.work}</p>
              </div>

              <div className=" w-14 flex items-center">
                <img
                  src={item.socialIcon}
                  alt="Social Icon"
                  className="w-8 h-6 "
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-white text-sm text-[Chivo] font-samibold">
              {item.comment}
            </p>
           
            <p className="flex items-center mt-4 gap-2">
              <FaRegThumbsUp size={20} className="text-white"/>
              <FaRegThumbsDown size={20} className="text-white"/>
              <h1 className="text-white text-sm">Reply</h1>
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
