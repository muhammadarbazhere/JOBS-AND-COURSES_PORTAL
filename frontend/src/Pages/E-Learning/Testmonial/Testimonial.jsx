import React from "react";
import GroupPhoto from "../../../assets/Group.jpg";
import successStoryImg from "../../../assets/successImg.jpg";
import Cards from "./Cards";

function Testimonial() {
  return (
    <div className="w-full px-3 md:px-0">
      <div className="w-full items-center space-y-5 flex flex-col justify-center  ">
        <img className="w-36 sm:w-52 h-16 " src={GroupPhoto} alt="loading" />

        <h1 className="border-2 font-[Chivo] px-5 py-0 rounded-full text-2xl bg-red-200 border-red-200">
          TESTIMONIALS
        </h1>

        <h1 className="text-[#FE7620] text-2xl sm:text-4xl leading-snug text-center font-[Chivo] font-bold">
          27,000+ students
          <span className="text-black"> have already </span>
          <h2 className="text-black">transformed their lives</h2>
        </h1>
      </div>

      <div className="w-full block md:hidden">
        <Cards />
      </div>

      <div className="w-full md:px-10 lg:px-20 py-6 hidden md:block">
        <img className="w-full h-full" src={successStoryImg} alt="loading" />
      </div>
    </div>
  );
}

export default Testimonial;

