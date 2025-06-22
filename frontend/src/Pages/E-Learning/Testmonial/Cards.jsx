import React from "react";
import ProductData from "./Product";

function Cards() {
  return (
    <div className="flex w-full flex-wrap py-6 justify-center items-center">
      {ProductData.map((item) => (
        <div
          key={item.id}
          className="bg-white w-full sm:w-[47%] mx-1 p-2 shadow-lg rounded-2xl overflow-hidden  mb-4"
        >
          <div>
            <div className="upp flex justify-between gap-2">
              <div className=" border-2 rounded-full w-16 h-12">
                {" "}
                <img
                  src={item.userImg}
                  alt={item.name}
                  className="w-full h-full rounded-full"
                />
              </div>

              <div className=" w-full">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.work}</p>
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
            <p className="text-gray-500 text-sm text-[Chivo] font-samibold">
              {item.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
