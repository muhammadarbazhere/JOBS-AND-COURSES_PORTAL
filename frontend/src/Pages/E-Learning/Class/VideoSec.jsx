import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';

function VideoSec() {
   const navigate = useNavigate()

  const handleEnrollClick = () => {
   navigate('/enroll')
  };

  return (
 

<div className="w-full  flex flex-col   overflow-hidden items-center justify-center">


<div className="bg-gradient-to-r from-cyan-500 to-blue-800  flex flex-col  font-[Chivo] items-center text-white  w-full h-96 space-y-1">
  <h1 className='mt-20 text-xl text-center'>That’s why we created</h1>
  <h1 className='text-3xl sm:text-5xl font-bold text-center'> a masterclass</h1>
  <h1 className='text-xl text-center '>to provide you more oppertunities </h1>
</div>


<div className="relative px-4  md:px-0 -top-32 w-full md:w-3/4 h-auto sm:h-full lg:h-full  z-10 flex flex-col   items-center">
    <iframe 
     title="Canva Tutorial"
     className="w-full h-96 lg:h-[85vh]   border-2 border-white rounded-3xl"
     src="https://www.youtube.com/embed/_XOWhA1dK7Y" 
     frameborder="0"
     allow="encrypted-media"
     >
     </iframe>



<div onClick={handleEnrollClick} className='bg-gradient-to-r text-md sm:text-lg from-cyan-400 to-blue-600 mt-6 sm:mt-10 w-auto space-x-3 sm:space-x-12 flex px-6 sm:px-6  py-2 sm:py-4 justify-center items-center rounded-md text-white font-[Chivo] mb-2 cursor-pointer'> 
  <span className='pl-6 sm:pl-20 text-xl'>Enroll Now </span>  
  <span className=''><FaArrowRight size={20}/></span> 
</div>


<h1 className='font-extrabold text-xl font-[Comfortaa] mt-3'>Next Live Q&A in</h1>
<Timer/>

</div>




</div>


 
  )
}

export default VideoSec