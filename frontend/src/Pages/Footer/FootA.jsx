import React from 'react'

function FootA() {

  const handleSubmit = () => {
    
    setTimeout(() => {
      window.location.href = 'tel:+923104163789';
    }, 1000); 
  };


  return (
  
        <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col sm:flex-row  justify-center items-center gap-2 px-0 sm:px-20  py-16 w-full mb-2">

  <div className="  flex flex-col items-center sm:items-start w-full md:w-7/12 ">

    <h1 className="text-4xl md:text-3xl px-10 sm:px-0 text-center  sm:text-start text-white font-[Comfortaa] mb-5">Start a Project with us Today</h1>

    <h3 className="text-white text-lg text-center sm:text-start md:text-start font-[Chivo]  flex items-center w-2/3 sm:w-full h-auto justify-center">
  Call us now to schedule an online appointment and get your project successfully completed
</h3>


  </div >

  <button onClick={handleSubmit} className="border-2 border-brown-700  font-[Chivo] flex items-center w-24 h-12 text-black bg-white border-white hover:text-white hover:bg-black hover:border-black rounded-md font-chivo text-lg duration-1000">
    Get Started
  </button>
  
</div>

  
  )
}

export default FootA