import React from "react";
import DashboardPage from "../../Dashboard/MainNavbar/Files/DashboardParts/DashboardPage";
import Career from "../../Dashboard/MainNavbar/Files/CareerParts/Career";
import ELearning from "../../Dashboard/MainNavbar/Files/ELearningParts/ELearning";

function AdminPanel() {
  return (
    <div className="bg-blue-100 w-full h-full pb-6 pt-24  items-center justify-center flex flex-col">

      <div className="space-y-2 sm:space-y-0 hidden sm:block sm:space-x-4 py-0  sm:flex   items-center justify-center">
        <DashboardPage />
        <Career />
        <ELearning />
      </div>

     

      <div className="block sm:hidden  py-0  px-4  items-center justify-center">
        <div className="flex  space-x-4 items-center  ">
          <div className="flex flex-wrap gap-5">
            <DashboardPage />
            <Career />
            <ELearning />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
