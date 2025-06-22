import React from 'react'
import AddCourseForm from '../../../../../Components/CoursesFiles/AddCourseForm'

function AddCourse() {
  return (
    <div className=' w-full h-full overflow-hidden px-6 sm:px-12 pt-6 bg-blue-100'>

  {/* <h1 className=' w-full h-28 text-gray-500  text-md flex items-center'>You are here: Home / Add New Courses</h1> */}
   <h1 className='w-full h-full sm:h-12  text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl sm:text-4xl font-[Chivo] font-semibold text-center  pb-2'>Add New Courses
   </h1>
  <hr />

<div className='pt-4 sm:pt-8 pb-14'>
<AddCourseForm />
</div>

    </div>
  )
}

export default AddCourse