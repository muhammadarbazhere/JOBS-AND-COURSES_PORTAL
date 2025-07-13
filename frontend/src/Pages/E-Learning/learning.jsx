import React from 'react'
import VideoSec from './Class/VideoSec'
import Master from './Master'
import Mentor from './Mentors/Mentor'
import Ques from './Question/Ques'

import CoursesList from '../../Components/CoursesFiles/CoursesList'


function learning() {
  return (
    <div className='bg-blue-100 overflow-hidden'>

{/* <div className="w-full space-y-1 pt-4 flex flex-col items-center text-center md:px-2">
        <p className="font-[Chivo] text-md sm:text-lg text-[#272727]">LEARN</p>
        <h1 className="font-[Comfortaa] mb-2 font-bold text-2xl sm:text-3xl text-[#272727]">
          Our Featured Courses
        </h1>
      </div> */}

<div className='py-10'>
<CoursesList/>
</div>

<VideoSec/>

<Master/>
<Mentor/>
<Ques/>



    </div>
  )
}

export default learning