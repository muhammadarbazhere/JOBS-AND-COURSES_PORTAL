import React from "react";
import Struggle from "./Struggle";
import Testimonial from "../E-Learning/Testmonial/Testimonial";
import Main1 from "../E-Learning/Counter/main1";
import Modules from '../E-Learning/Module/Modules'
import Certificate from "../E-Learning/Certificate";


function EnrollNow() {
  return (
    <div className="bg-blue-100">
      <Struggle />
      <Testimonial />
      <Main1/>
      <Modules/>
    <Certificate/>
    

    </div>
  );
}

export default EnrollNow;
