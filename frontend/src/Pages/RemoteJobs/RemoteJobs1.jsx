import React from 'react';
import { FaQuestion, FaArrowDown } from "react-icons/fa";

const RemoteJobs1 = ({ scrollToJobs }) => {
    return (
        <div className="flex h-auto py-12 px-2 sm:px-0 flex-col bg-blue-100 items-center justify-center">
            <h2 className="text-2xl text-gray-600 font-bold text-center mb-4 font-[Chivo]">
                Do you struggle with
            </h2>
            <h1 className="text-xl leading-relaxed sm:text-3xl lg:text-5xl text-center font-bold mb-16 font-[Comfortaa]">
                New Employment Opportunities?
            </h1>
           
            <section className="flex px-2 sm:px-2 flex-wrap font-[Chivo] md:flex md:flex-row justify-center items-center">
                <div className='firstDiv w-full md:w-1/4 mx-12 md:mx-0 mb-2 md:mb-0 px-1 py-3 md:p-1 md:py-1 flex flex-col lg:flex-row justify-center items-center'>
                    <div className='border-2 border-yellow-300 rounded-full bg-red-600 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
                    <h4>Eager to Dive into the Latest Tech Opportunities?</h4>
                </div>

                <div className='SecondDiv w-1/2 md:w-1/4 p-1 flex flex-col lg:flex-row justify-center items-center'>
                    <div className='border-2 border-yellow-300 rounded-full bg-red-500 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
                    <h4>Seeking opportunities in SEO, Social Media, and Graphic Design?</h4>
                </div>

                <div className='ThirdDiv w-1/2 md:w-1/4 p-1 flex flex-col lg:flex-row justify-center items-center'>
                    <div className='border-2 border-yellow-300 rounded-full bg-red-500 text-white p-1 mx-2'>
                        <FaQuestion size={25}/>
                    </div>
                    <h4>Excited to explore the newest opportunities in your field?</h4>
                </div>
            </section>

            {/* Improved Spicy Section */}
            <section className="relative my-16 py-8 px-4 w-full bg-cover bg-center text-white" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?remote,work")' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 px-4">
                        "The future belongs to those who believe in the beauty of their dreams."
                    </h2>
                    <p className="text-center text-lg sm:text-xl mb-4">
                        - Eleanor Roosevelt
                    </p>
                    <p className="text-center text-xl sm:text-2xl mb-4">
                        Scroll down to explore the latest job opportunities!
                    </p>
                    <FaArrowDown size={30} className="animate-bounce cursor-pointer" onClick={scrollToJobs} />
                </div>
            </section>
        </div>
    );
}

export default RemoteJobs1;
