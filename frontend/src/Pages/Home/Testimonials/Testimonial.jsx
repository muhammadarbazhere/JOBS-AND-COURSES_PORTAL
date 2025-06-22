import React from 'react';
import products from './Products';

const Testimonial = () => {
  
  return (
    <div className="w-full px-4 lg:px-20 py-0 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((item) => (
        <div key={item.id} className="border rounded-xl shadow-md bg-white">
          <div className="px-6 py-4">
            <p className="text-black font-[Comfortaa] leading-7">{item.description}</p>
       
          <hr className="my-4" />
          {/* <div className=' bg-red-500'> */}

            <h3 className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl font-bold font-[Chivo]">
              {item.title} 
      <span className="text-black font-bold font-[Chivo]">
                {item.subTitle}
      </span>
            </h3>
            </div>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
}

export default Testimonial;
