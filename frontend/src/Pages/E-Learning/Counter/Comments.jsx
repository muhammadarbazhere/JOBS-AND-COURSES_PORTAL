import React from "react";
import studentsReply from "../../../assets/students1.jpg";
import Cards from "./Cards";

function Comments() {
  return (
    <div>
        
      <div className="w-full flex-col hidden md:block  lg:px-20 py-2">
        <img className="w-full flex-col" src={studentsReply} alt="loading" />
      </div>

      <div className="block md:hidden">
        <Cards />
      </div>

    </div>
  );
}

export default Comments;
