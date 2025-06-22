import React from "react";
import studentsReply from "../../../assets/students1.jpg";
import TimeCounter from "./TimeCounter";
import Comments from "./Comments";

function Main1() {
  return (
    <div className="px-3">

     
    
        <h1 className="text-[#222024] text-2xl pt-6 font-[Chivo]  text-center font-bold">
          Numbers that speak for themselves
        </h1>
  

    <TimeCounter/>
    <Comments/>

    </div>
  );
}

export default Main1;
