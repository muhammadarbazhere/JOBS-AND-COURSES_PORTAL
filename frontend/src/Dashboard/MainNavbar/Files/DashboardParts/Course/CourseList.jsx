import React from "react";
import CoursesTable from "../../../../../Components/CoursesFiles/CoursesTable";

function CourseList() {
  return (
    <div className="flex w-full h-full flex-col pb-6 px-0 sm:px-2 md:px-10 lg:px-24 font-[Chivo] bg-blue-100">
      <div className="flex"></div>

      <CoursesTable />
    </div>
  );
}

export default CourseList;
