import React from 'react';
import { FaQuestion } from "react-icons/fa";
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Struggle = () => {
const navigate = useNavigate()

const onSubmitClick = () => {

    setTimeout(() => {
      navigate('/form'); 
    }, ); 
  };


    return (
        <div className="flex h-auto py-12 px-2 sm:px-0 flex-col bg-blue-100 items-center justify-center">

  <h2 className="text-2xl text-gray-600 font-bold text-center mb-4 font-[Chivo]">
    Do you struggle with
    </h2>
  <h1 className="text-xl leading-relaxed sm:text-3xl lg:text-5xl text-center font-bold mb-16 font-[Comfortaa]">New Employment Opportunities ?
  </h1>
 
           
            <section className="flex px-2  sm:px-2 flex-wrap font-[Chivo] md:flex md:flex-row  justify-center items-center">


                <div className='firstDiv w-full md:w-1/4  mx-12 md:mx-0 mb-2 md:mb-0 px-1 py-3 md:p-1 md:py-1  flex flex-col lg:flex-row  justify-center items-center'>
                    <div className='border-2 border-yellow-300 rounded-full bg-red-600 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
                    <h4>Eager to Dive into the Latest Tech Opportunities?</h4>
                </div>


                <div className='SecondDiv w-1/2 md:w-1/4 p-1  flex flex-col lg:flex-row  justify-center items-center'>
                    <div className='border-2  border-yellow-300 rounded-full bg-red-500 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
                    <h4>Seeking oppertunities in SEO, Social Media and Graphic Design?</h4>
                </div>


                <div className='ThirdDiv w-1/2 md:w-1/4 p-1 flex flex-col lg:flex-row justify-center items-center'>
                    <div className='border-2 border-yellow-300 rounded-full bg-red-500 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
            <h4>Excited to explore the newest opportunities in your field?</h4>
                </div>

              


            </section>

            <button onClick={onSubmitClick}  className='bg-gradient-to-r text-md sm:text-lg from-cyan-400 to-blue-600 mt-6 sm:mt-10 w-auto space-x-3 sm:space-x-12 flex px-6 sm:px-6  py-2 sm:py-4 justify-center items-center rounded-md text-white font-[Chivo] mb-2'> 
  <span className='pl-6 sm:pl-20 text-xl'>Enroll Now </span>  
  <span className=''><FaArrowRight size={20}/></span> 
</button>
        </div>
    );
}

export default Struggle;
