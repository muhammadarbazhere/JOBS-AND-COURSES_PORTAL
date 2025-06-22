import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import products from "./Products";

const Ques = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-36 py-20">
      <h1 className="text-3xl sm:text-4xl mb-8 mt-2 text-center font-bold font-[Chivo] ">
        Frequently Asked Questions
      </h1>

      {products.map((product, index) => (
        <div key={product.id} className="my-4">
          <div
            className="flex justify-between w-full px-4 mx-auto items-center bg-[#F5F5F5] cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={() => handleToggle(index)}
          >
            <h3 className="text-lg px-2 sm:px-4 py-6 text-[#222A2A] font-semibold">
              {product.question}
            </h3>
            {openIndex === index ? <IoIosArrowDown /> : <FaPlus />}
          </div>

          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              openIndex === index ? "max-h-[1000px]" : "h-0 max-h-0"
            }`}
          >
            <p className="mb-6 pr-9 pl-4 py-4 w-full mx-auto text-[#222A2A] bg-white">
              {product.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ques;
